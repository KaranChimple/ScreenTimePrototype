import Foundation

/// Response model for screen-time approval decisions.
/// Separates data representation from business logic.
struct ScreenTimeApprovalResponse {
    let approved: Bool
    let reason: String
    let timestamp: Date

    /// Converts response to a dictionary for bridge serialization to React Native.
    func toDictionary() -> [String: Any] {
        let formatter = DateFormatter()
        formatter.dateFormat = "yyyy-MM-dd HH:mm:ss"
        formatter.locale = Locale(identifier: "en_US_POSIX")

        return [
            "approved": approved,
            "reason": reason,
            "timestamp": formatter.string(from: timestamp)
        ]
    }
}
