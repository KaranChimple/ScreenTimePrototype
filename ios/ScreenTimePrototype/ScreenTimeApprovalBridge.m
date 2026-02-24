#import <React/RCTBridgeModule.h>

/// Objective-C bridge macro file for the ScreenTimeApproval native module.
/// This registers the Swift module and its methods with React Native.

@interface RCT_EXTERN_MODULE(ScreenTimeApproval, NSObject)

RCT_EXTERN_METHOD(requestApproval:
                  (RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)

@end
