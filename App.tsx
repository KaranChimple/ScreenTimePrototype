/**
 * Daily Screen-Time Approval Prototype
 *
 * Demonstrates the flow:
 * React Native → Swift approval logic → React Native UI update
 */

import React, {useState} from 'react';
import {
  NativeModules,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  StatusBar,
  useColorScheme,
} from 'react-native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';

const {ScreenTimeApproval} = NativeModules;

type ApprovalResult = {
  approved: boolean;
  reason: string;
  timestamp: string;
};

type ApprovalState = 'idle' | 'loading' | 'approved' | 'denied';

function ApprovalScreen(): React.JSX.Element {
  const [state, setState] = useState<ApprovalState>('idle');
  const [result, setResult] = useState<ApprovalResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const isDarkMode = useColorScheme() === 'dark';

  const requestApproval = async () => {
    setState('loading');
    setError(null);

    try {
      const response: ApprovalResult =
        await ScreenTimeApproval.requestApproval();
      setResult(response);
      setState(response.approved ? 'approved' : 'denied');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      setState('idle');
    }
  };

  const getStatusIcon = () => {
    switch (state) {
      case 'approved':
        return '✅';
      case 'denied':
        return '❌';
      default:
        return '⏳';
    }
  };

  const getStatusText = () => {
    switch (state) {
      case 'approved':
        return 'Approved';
      case 'denied':
        return 'Not Approved';
      case 'loading':
        return 'Checking...';
      default:
        return 'Tap below to request approval';
    }
  };

  const dynamicStyles = {
    container: {
      backgroundColor: isDarkMode ? '#0D1117' : '#F6F8FA',
    },
    card: {
      backgroundColor: isDarkMode ? '#161B22' : '#FFFFFF',
      shadowColor: isDarkMode ? '#000' : '#8B949E',
    },
    title: {
      color: isDarkMode ? '#F0F6FC' : '#1F2328',
    },
    subtitle: {
      color: isDarkMode ? '#8B949E' : '#656D76',
    },
    statusText: {
      color:
        state === 'approved'
          ? '#3FB950'
          : state === 'denied'
            ? '#F85149'
            : isDarkMode
              ? '#F0F6FC'
              : '#1F2328',
    },
    reasonText: {
      color: isDarkMode ? '#C9D1D9' : '#1F2328',
    },
    timestamp: {
      color: isDarkMode ? '#484F58' : '#8B949E',
    },
  };

  return (
    <SafeAreaView style={[styles.container, dynamicStyles.container]}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />

      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.title, dynamicStyles.title]}>
          🕐 Daily Screen Time
        </Text>
        <Text style={[styles.subtitle, dynamicStyles.subtitle]}>
          Approval Prototype
        </Text>
      </View>

      {/* Status Card */}
      <View style={[styles.card, dynamicStyles.card]}>
        <Text style={styles.statusIcon}>{getStatusIcon()}</Text>
        <Text style={[styles.statusText, dynamicStyles.statusText]}>
          {getStatusText()}
        </Text>

        {state === 'loading' && (
          <ActivityIndicator
            size="large"
            color={isDarkMode ? '#58A6FF' : '#0969DA'}
            style={styles.spinner}
          />
        )}

        {result && state !== 'loading' && (
          <View style={styles.resultDetails}>
            <Text style={[styles.reasonText, dynamicStyles.reasonText]}>
              {result.reason}
            </Text>
            <Text style={[styles.timestamp, dynamicStyles.timestamp]}>
              {result.timestamp}
            </Text>
          </View>
        )}

        {error && (
          <Text style={styles.errorText}>{error}</Text>
        )}
      </View>

      {/* Action Button */}
      <TouchableOpacity
        style={[
          styles.button,
          state === 'loading' && styles.buttonDisabled,
        ]}
        onPress={requestApproval}
        disabled={state === 'loading'}
        activeOpacity={0.8}>
        <Text style={styles.buttonText}>
          {state === 'loading' ? 'Requesting...' : 'Request Daily Approval'}
        </Text>
      </TouchableOpacity>

      {/* Footer */}
      <Text style={[styles.footer, dynamicStyles.subtitle]}>
        Simulated locally via Swift Native Module
      </Text>
    </SafeAreaView>
  );
}

function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <ApprovalScreen />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
  header: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '400',
  },
  card: {
    borderRadius: 16,
    padding: 32,
    alignItems: 'center',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    marginBottom: 32,
  },
  statusIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  statusText: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 8,
  },
  spinner: {
    marginTop: 16,
  },
  resultDetails: {
    marginTop: 16,
    alignItems: 'center',
  },
  reasonText: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 8,
  },
  timestamp: {
    fontSize: 12,
    fontWeight: '300',
  },
  errorText: {
    color: '#F85149',
    fontSize: 14,
    marginTop: 12,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#238636',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 32,
    alignItems: 'center',
    marginBottom: 24,
  },
  buttonDisabled: {
    backgroundColor: '#1A7F37',
    opacity: 0.6,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  footer: {
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '300',
  },
});

export default App;
