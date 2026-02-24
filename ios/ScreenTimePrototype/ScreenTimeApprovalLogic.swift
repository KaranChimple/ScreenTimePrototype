import Foundation

/// Business logic for daily screen-time approval decisions.
/// Uses time-based rules and in-memory state — no real ScreenTime APIs.
class ScreenTimeApprovalLogic {

    /// Daily request counter (resets conceptually per day, in-memory only)
    private var dailyRequestCount: Int = 0

    /// Hour cutoff: requests after this hour (24h format) are denied.
    private let cutoffHour: Int = 20 // 8 PM

    /// Simulated processing delay in seconds (mimics a real API call).
    private let simulatedDelaySeconds: Double = 1.5

    /// Checks whether screen time is approved based on the current time.
    /// - Parameter completion: Called with the approval response after a simulated delay.
    func checkApproval(completion: @escaping (ScreenTimeApprovalResponse) -> Void) {
        dailyRequestCount += 1

        // Simulate async API call with a delay
        DispatchQueue.global(qos: .userInitiated).asyncAfter(
            deadline: .now() + simulatedDelaySeconds
        ) { [weak self] in
            guard let self = self else { return }

            let now = Date()
            let calendar = Calendar.current
            let currentHour = calendar.component(.hour, from: now)

            let response: ScreenTimeApprovalResponse

            if currentHour < self.cutoffHour {
                response = ScreenTimeApprovalResponse(
                    approved: true,
                    reason: "Approved — current time (\(currentHour):00) is before the \(self.cutoffHour):00 cutoff. Request #\(self.dailyRequestCount) today.",
                    timestamp: now
                )
            } else {
                response = ScreenTimeApprovalResponse(
                    approved: false,
                    reason: "Not approved — current time (\(currentHour):00) is past the \(self.cutoffHour):00 cutoff. Screen time ends at \(self.cutoffHour):00.",
                    timestamp: now
                )
            }

            completion(response)
        }
    }
}
