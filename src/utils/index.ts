import { ExtensionField } from '../types';

export const classNames = (
  ...classes: (string | boolean | undefined | null)[]
): string => {
  return classes.filter(Boolean).join(' ');
};

// Flatten nested objects to find all available fields
export const flattenObject = (obj: any, prefix = ''): Record<string, any> => {
  const flattened: Record<string, any> = {};

  if (!obj || typeof obj !== 'object') return flattened;

  Object.keys(obj).forEach((key) => {
    const value = obj[key];
    const newKey = prefix ? `${prefix}.${key}` : key;

    if (
      value &&
      typeof value === 'object' &&
      !Array.isArray(value) &&
      !(value instanceof Date)
    ) {
      Object.assign(flattened, flattenObject(value, newKey));
    } else {
      flattened[newKey] = value;
    }
  });

  return flattened;
};

// Identify fields that might be extension-added (heuristic approach)
export const findUnrenderedFields = (
  allFields: Record<string, any>
): ExtensionField[] => {
  const potentialExtensionFields: ExtensionField[] = [];

  // Look for fields that seem like they were added by extensions
  Object.entries(allFields).forEach(([key, value]) => {
    // Skip common React/HTML props
    if (isCommonProp(key)) return;

    // Skip null/undefined values
    if (value == null) return;

    // Look for extension-specific patterns
    if (isLikelyExtensionField(key, value)) {
      potentialExtensionFields.push({
        key,
        value,
        type: getFieldType(value),
      });
    }
  });

  return potentialExtensionFields;
};

export const isCommonProp = (key: string): boolean => {
  const commonProps = [
    'children',
    'className',
    'style',
    'id',
    'key',
    'ref',
    'onClick',
    'onChange',
    'onSubmit',
    'onFocus',
    'onBlur',
    'data-',
    'aria-',
    'role',
    'tabIndex',
  ];

  return commonProps.some((prop) => key === prop || key.startsWith(prop));
};

export const isLikelyExtensionField = (key: string, value: any): boolean => {
  // Look for extension patterns
  const extensionPatterns = [
    /extension/i,
    /ai/i,
    /generated/i,
    /computed/i,
    /enhanced/i,
    /score/i,
    /rating/i,
    /analysis/i,
    /metadata/i,
  ];

  // Check if key matches extension patterns
  if (extensionPatterns.some((pattern) => pattern.test(key))) {
    return true;
  }

  // Check if value has extension-like structure
  if (typeof value === 'object' && value !== null) {
    if (value.source === 'extension-proxy' || value.generatedBy) {
      return true;
    }
  }

  // Check for fields with timestamps that might be extension-added
  if (key.includes('At') || key.includes('Time')) {
    return true;
  }

  return false;
};

export const getFieldType = (value: any): string => {
  if (typeof value === 'string') return 'string';
  if (typeof value === 'number') return 'number';
  if (typeof value === 'boolean') return 'boolean';
  if (Array.isArray(value)) return 'array';
  if (value instanceof Date) return 'date';
  if (typeof value === 'object') return 'object';
  return 'unknown';
};
