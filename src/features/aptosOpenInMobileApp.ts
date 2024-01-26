// Copyright © Aptos Foundation
// SPDX-License-Identifier: Apache-2.0

/** Version of the feature. */
export type AptosOpenInMobileAppVersion = '1.0.0'
/** Name of the feature. */
export const AptosOpenInMobileAppNamespace = 'aptos:openInMobileApp'
/** TODO: docs */
export type AptosOpenInMobileAppFeature = {
  /** Namespace for the feature. */
  [AptosOpenInMobileAppNamespace]: {
    /** Version of the feature API. */
    version: AptosOpenInMobileAppVersion
    openInMobileApp: AptosOpenInMobileAppMethod
  }
}
/** TODO: docs */
export type AptosOpenInMobileAppMethod = () => void
