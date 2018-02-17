package org.apache.cordova.labs.scanner.ipda018;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.device.ScanDevice;
import java.util.ArrayList;
import org.apache.cordova.*;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

public class Scanner extends CordovaPlugin {
	ScanDevice sm;
	private final static String SCAN_ACTION = "scan.rcv.message";
	private CallbackContext mMainCallback;

	private BroadcastReceiver mScanReceiver = new BroadcastReceiver() {

		@Override
		public void onReceive(Context context, Intent intent) {
			byte[] barocode = intent.getByteArrayExtra("barocode");
			int barocodelen = intent.getIntExtra("length", 0);
			byte temp = intent.getByteExtra("barcodeType", (byte) 0);
			String barcodeStr = new String(barocode, 0, barocodelen);

			JSONArray jsEvent = new JSONArray();
			jsEvent.put("scan");
			jsEvent.put(barcodeStr);
			PluginResult pluginResult = new PluginResult(PluginResult.Status.OK, jsEvent);
			pluginResult.setKeepCallback(true);
			mMainCallback.sendPluginResult(pluginResult);

			sm.stopScan();
		}
	};

	@Override
	public void initialize(CordovaInterface cordova, CordovaWebView webView) {
		super.initialize(cordova, webView);

		sm = new ScanDevice();
	}

    @Override
    public void onPause(boolean multitasking) {
				JSONArray jsEvent = new JSONArray();
				jsEvent.put("pluginpause");
				PluginResult pluginResult = new PluginResult(PluginResult.Status.OK, jsEvent);
				pluginResult.setKeepCallback(true);
				mMainCallback.sendPluginResult(pluginResult);

        super.onPause(multitasking);
        if(sm != null) {
        	sm.stopScan();
        }
        this.cordova.getActivity().unregisterReceiver(mScanReceiver);
    }
    @Override
    public void onResume(boolean multitasking) {
        super.onResume(multitasking);
        IntentFilter filter = new IntentFilter();
        filter.addAction(SCAN_ACTION);
        this.cordova.getActivity().registerReceiver(mScanReceiver, filter);

		JSONArray jsEvent = new JSONArray();
		jsEvent.put("pluginresume");
		jsEvent.put(sm.isScanOpened());
		jsEvent.put(sm.getScanVibrateState());
		jsEvent.put(sm.getScanBeepState());
		PluginResult pluginResult = new PluginResult(PluginResult.Status.OK, jsEvent);
		pluginResult.setKeepCallback(true);
		mMainCallback.sendPluginResult(pluginResult);
    }

    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {

		if ("init".equals(action)) {
			mMainCallback = callbackContext;
			this.onResume(false);
			return true;
		} else if ("open".equals(action)) {
			if (!sm.isScanOpened()) {
				sm.openScan();
			}
			sm.setOutScanMode(0);

			JSONArray jsEvent = new JSONArray();
			jsEvent.put("open");
			PluginResult pluginResult = new PluginResult(PluginResult.Status.OK, jsEvent);
			pluginResult.setKeepCallback(true);
			mMainCallback.sendPluginResult(pluginResult);

			return true;
		} else if ("close".equals(action)) {
			if (sm.isScanOpened()) {
				sm.closeScan();
			}

			JSONArray jsEvent = new JSONArray();
			jsEvent.put("close");
			PluginResult pluginResult = new PluginResult(PluginResult.Status.OK, jsEvent);
			pluginResult.setKeepCallback(true);
			mMainCallback.sendPluginResult(pluginResult);

			return true;
		} else if ("vibrateEnabled".equals(action)) {
			if (args.getBoolean(0)) {
				sm.setScanVibrate();
			} else {
				sm.setScanUnVibrate();
			}

			JSONArray jsEvent = new JSONArray();
			jsEvent.put("vibratechange");
			jsEvent.put(args.getBoolean(0));
			PluginResult pluginResult = new PluginResult(PluginResult.Status.OK, jsEvent);
			pluginResult.setKeepCallback(true);
			mMainCallback.sendPluginResult(pluginResult);

			return true;
		} else if ("beepEnabled".equals(action)) {
			if (args.getBoolean(0)) {
				sm.setScanBeep();
			} else {
				sm.setScanUnBeep();
			}

			JSONArray jsEvent = new JSONArray();
			jsEvent.put("beepchange");
			jsEvent.put(args.getBoolean(0));
			PluginResult pluginResult = new PluginResult(PluginResult.Status.OK, jsEvent);
			pluginResult.setKeepCallback(true);
			mMainCallback.sendPluginResult(pluginResult);

			return true;

		}
		callbackContext.error(action + " is not a supported action");
		return false;
    }
}