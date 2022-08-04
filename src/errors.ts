export type SdkErrorCode =
  | 'expired-access-token'
  | 'no-access-token'
  | 'network-failure'
  | 'not-authorized'
  | 'forbidden'
  | 'rate-limit-reached'
  | 'unhandled-server-error'
  | 'no-avatars-available'
  | 'user-action-required'

const MESSAGES: Record<SdkErrorCode, string> = {
  'expired-access-token':
    'Your access token is expired. Please request a new one using `Bkpk.authorize()`',
  'network-failure': 'There was a problem connecting to the API',
  'no-access-token':
    'You must authorize the user first (use `Bkpk.authorize()`)',
  forbidden: 'You are not authorized to access that resource',
  'rate-limit-reached': `You've hit the API rate limit, please try again later`,
  'unhandled-server-error': 'Unhandled Server Error',
  'not-authorized':
    'Your access token is invalid, please reauthenticate the user',
  'no-avatars-available': 'No avatars available for this user',
  'user-action-required':
    'A user action must trigger `Bkpk.authorize()` if `disableIframeFallback` is set',
}

class BkpkError extends Error {
  constructor(message: string) {
    super(`[@bkpk/sdk] ${message}`)
  }
}

export class SdkError extends BkpkError {
  constructor(public code: SdkErrorCode) {
    super(MESSAGES[code])
  }
}

// Errors returned from API, not handled by SDK
export class ApiError extends BkpkError {
  constructor(public code: string, message: string) {
    super(message)
  }
}
