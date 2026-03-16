# Feature Report - Authentication

Feature folder: `tests/auth/`
Date: 2026-03-16

## Scope

- Login page validation
- Negative login scenarios
- Register page validation
- Register success and validation errors

## Test Results

- Total: 11
- Passed: 10
- Skipped: 1
- Failed: 0

## Executed Test Cases

- `TC_AUTH_L01` Login page renders required elements - Passed
- `TC_AUTH_L02` Invalid credentials show error - Passed
- `TC_AUTH_L03` Empty login form shows error - Passed
- `TC_AUTH_L04` Wrong password shows error - Passed
- `TC_AUTH_L05` Continue to create account page - Passed
- `TC_AUTH_L06` Valid login to My Account - Skipped (requires real credentials)
- `TC_AUTH_R01` Register page renders required fields - Passed
- `TC_AUTH_R02` Empty register form validation - Passed
- `TC_AUTH_R03` New account registration success - Passed
- `TC_AUTH_R04` Duplicate login name validation - Passed
- `TC_AUTH_R05` Mismatched password validation - Passed

## Conclusion

Authentication coverage is stable for UI flow and validation scenarios. Successful login with known credentials is optional and controlled by environment variables.

