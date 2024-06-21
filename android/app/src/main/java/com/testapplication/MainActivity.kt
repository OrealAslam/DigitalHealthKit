package com.testapplication

import android.os.Bundle
import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate
import org.devio.rn.splashscreen.SplashScreen // import this
import com.google.android.gms.ads.MobileAds // Import this for Native Ad


class MainActivity : ReactActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        SplashScreen.show(this)  // Show the splash screen
        super.onCreate(savedInstanceState)
        MobileAds.initialize(this) { }
    }
  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  override fun getMainComponentName(): String = "TestApplication"

  /**
   * Returns the instance of the [ReactActivityDelegate]. We use [DefaultReactActivityDelegate]
   * which allows you to enable New Architecture with a single boolean flags [fabricEnabled]
   */
  override fun createReactActivityDelegate(): ReactActivityDelegate =
      DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)
}
