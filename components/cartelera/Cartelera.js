import React, { PureComponent } from 'react';
import { FlatList, TouchableNativeFeedback, View, Image } from 'react-native';

import CarteleraRow from './CarteleraRow';
import CarteleraHeader from './CarteleraHeader';
import EmptyCartelera from './EmptyCartelera';
import MateriaCard from './MateriaCard';
import Button from '../Button';
import ErrorCard from '../ErrorCard';

import getCartelera from '../../lib/getCartelera';
import contexts from '../../lib/contexts';

import pubsub from 'pubsub-js';

export default class Cartelera extends PureComponent{
  constructor(props){
    super(props);
    this.state = {
      tableData: [],
      refreshing: false,
      query: null,
      filters: null,
      cantGetData: false
    };
  }
  componentDidMount(){
    this.pubsub_subscription = pubsub.subscribe('onSearchValueChange',(event, value)=>{
      this.setState({query: value});
    });
    this.requestData();
  }
  static getDerivedStateFromProps(props){
    return {
      filters: props.filters
    }
  }

  requestData = ()=>{
    this.setState((prev)=>{
      return {
        ...prev,
        refreshing: true,
        cantGetData: false
      }
    },()=>{
      getCartelera()
        .then((data)=>{
          this.setState({
            tableData: data,
            refreshing: false
          })
        })
        .catch((err)=>{
          this.setState({
            tableData: [],
            cantGetData: true,
            refreshing: false
          });
        });
    });
  }

  handleRefresh = ()=>{
    this.requestData();
  }

  renderItem = ({ item, index }) => (
    <TouchableNativeFeedback onPress={()=>{this.panelActions.openBottomPanel(<MateriaCard data={item}/>,320)}}>
      <CarteleraRow
        data={item} 
        filters={this.props.filters}
        isEven={index % 2 === 0 ? true : false}/>
    </TouchableNativeFeedback>
  )

  render(){
    const filters = this.state.filters;
    let tableData = this.state.tableData;
    for(var filter in filters){
      if(filters[filter] != 'Todo'){
        tableData = tableData.filter((row) => row.catedra[filter] === filters[filter]);
      }
    }

    if(this.state.query){
      tableData = tableData.filter((row) => (
        `${row.nombre} ${row.docente} ${row.catedra.corto}`
        .toLowerCase()
        .indexOf( this.state.query.toLowerCase() ) !== -1
      ));
    }
    if(this.state.cantGetData){
      return (
        <View style={{height: '90%', justifyContent: 'center', alignItems: 'center'}}>
          <ErrorCard
            image={<Image source={require('../../assets/failedfetch.png')}/>}
            title="Algo salió mal"
            content="No hay conexión con el servidor">
            <Button title="Reintentar" iconName="autorenew" onPress={this.handleRefresh} transparent={true}/>
          </ErrorCard>
        </View>
      )
    }
    else{
      return (
        <contexts.panelCtx.Consumer>
          {(panelActions)=>{
            this.panelActions = panelActions;
            return (
              <FlatList 
                data={tableData}
                extraData={this.state.filters}
                getItemLayout={(data, index) => ({length: 39, offset: 39 * index, index})}
                renderItem={(item) => (
                  <CarteleraRow 
                    data={item} 
                    onPress={this.navigate} 
                    panelActions={panelActions}
                    filters={this.state.filters}/>
                )}
                refreshing={this.state.refreshing}
                onRefresh={this.handleRefresh}
                ListHeaderComponent={tableData.length ? <CarteleraHeader/> : null}
                ListEmptyComponent={!this.state.refreshing ? <EmptyCartelera thereIsData={this.state.tableData.length ? true : false}/> : null}
                initialNumToRender={14}
                contentContainerStyle={[!tableData.length && {flex: 1}]}
              />
            )
          }}
        </contexts.panelCtx.Consumer>
      )
    }
  }
} 