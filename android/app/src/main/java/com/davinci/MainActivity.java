package ar.edu.davinci.cartelera;

import android.os.Bundle;
import com.facebook.react.ReactActivity;
import org.devio.rn.splashscreen.SplashScreen;

import android.view.View;
import android.view.ViewStub;
import android.view.ViewGroup;
import android.view.LayoutInflater;
import java.util.Random;


public class MainActivity extends ReactActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        int[] layouts = new int[] {
            R.layout.variant_as, 
            R.layout.variant_ca, 
            R.layout.variant_dg,
            R.layout.variant_dm, 
            R.layout.variant_dw, 
            R.layout.variant_vj
        };
        int layoutId = layouts[new Random().nextInt(layouts.length)];

        SplashScreen.show(this, layoutId, R.id.variant_wrapper);
        super.onCreate(savedInstanceState);
    }

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "davinci";
    }
}
