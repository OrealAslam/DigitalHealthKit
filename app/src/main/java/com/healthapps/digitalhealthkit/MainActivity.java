package com.healthapps.digitalhealthkit;

import android.os.Handler;
import androidx.appcompat.app.AppCompatActivity;
import android.animation.ValueAnimator;
import android.annotation.SuppressLint;
import android.os.Bundle;
import android.widget.ProgressBar;
import android.app.Activity;
import android.content.Intent;
import android.os.CountDownTimer;
import android.view.View;
import android.view.Window;
import android.view.WindowManager;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;
import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint;
import com.facebook.react.defaults.DefaultReactActivityDelegate;
import org.devio.rn.splashscreen.SplashScreen;
import com.facebook.react.defaults.DefaultReactActivityDelegate;

import org.w3c.dom.Text;
import java.sql.Time;
import java.util.HashMap;
import java.util.Map;
import java.util.Timer;
import java.util.TimerTask;


public class MainActivity extends ReactActivity {

  private ProgressBar progressBar;
  private int progressStatus = 0;
  private Handler handler = new Handler();
/**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */

  @Override
  protected String getMainComponentName() {
    return "DigitalHealthKit";
  }

  /**
   * Returns the instance of the {@link ReactActivityDelegate}. Here we use a util class {@link
   * DefaultReactActivityDelegate} which allows you to easily enable Fabric and Concurrent React
   * (aka React 18) with two boolean flags.
   */
  @Override
  protected ReactActivityDelegate createReactActivityDelegate() {
    return new DefaultReactActivityDelegate(
      this,
      getMainComponentName(),
      // If you opted-in for the New Architecture, we enable the Fabric Renderer.
      DefaultNewArchitectureEntryPoint.getFabricEnabled(), // fabricEnabled
      // If you opted-in for the New Architecture, we enable Concurrent React (i.e. React 18).
      DefaultNewArchitectureEntryPoint.getConcurrentReactEnabled() // concurrentRootEnabled
    );
  }

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    Window w = getWindow();
    w.setFlags(WindowManager.LayoutParams.FLAG_LAYOUT_NO_LIMITS, WindowManager.LayoutParams.FLAG_LAYOUT_NO_LIMITS);
    w.getDecorView().setSystemUiVisibility(View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY | View.SYSTEM_UI_FLAG_FULLSCREEN | View.SYSTEM_UI_FLAG_HIDE_NAVIGATION);
    // Start a background thread to update the progress
    androidx.core.splashscreen.SplashScreen.installSplashScreen(this); // native splash screen which will be skipped
    org.devio.rn.splashscreen.SplashScreen.show(this, true); // custom splash screen from react-native-splash-screen library
    if (savedInstanceState != null) {
			savedInstanceState.remove("android:support:fragments");
			savedInstanceState.remove("android:fragments");
		}
    super.onCreate(savedInstanceState);
    val progressBar = findViewById<ProgressBar>(R.id.progressbar)
    animateProgressBar(progressBar, 0, 300, 30000)
  }


  fun animateProgressBar(progressBar: ProgressBar, start: Int, end: Int, duration: Long) {
        val animator = ValueAnimator.ofInt(start, end)
        animator.duration = duration
        animator.addUpdateListener { animation ->
            progressBar.progress = animation.animatedValue as Int
        }

        animator.start()
    }
}