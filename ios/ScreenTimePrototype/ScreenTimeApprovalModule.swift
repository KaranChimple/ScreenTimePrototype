import Foundation
import React

/// Native Module that bridges Swift approval logic to React Native.
/// Exposes `requestApproval` as a Promise-based method to JavaScript.
@objc(ScreenTimeApproval)
class ScreenTimeApprovalModule: NSObject {

    private let approvalLogic = ScreenTimeApprovalLogic()

    /// Required by React Native — indicates this module does NOT need main queue setup.
    @objc static func requiresMainQueueSetup() -> Bool {
        return false
    }

    /// Called from React Native via NativeModules.ScreenTimeApproval.requestApproval()
    /// Returns a Promise that resolves with the approval result dictionary.
    @objc func requestApproval(
        _ resolve: @escaping RCTPromiseResolveBlock,
        rejecter reject: @escaping RCTPromiseRejectBlock
    ) {
        approvalLogic.checkApproval { response in
            resolve(response.toDictionary())
        }
    }
}
