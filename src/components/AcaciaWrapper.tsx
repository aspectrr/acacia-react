import React, { useState, useEffect, useRef } from 'react';
import { AcaciaWrapperProps, ExtensionField } from '../types';
import { flattenObject, findUnrenderedFields } from '../utils';

export default function AcaciaWrapper({
  children,
  data = {},
  className = '',
  showExtensionFields = true,
  extensionFieldsPosition = 'bottom',
}: AcaciaWrapperProps) {
  const [extensionFields, setExtensionFields] = useState<ExtensionField[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const childRef = useRef<HTMLDivElement>(null);
  const originalPropsRef = useRef<any>(null);

  useEffect(() => {
    // Extract props from the child component
    const childProps = children?.props || {};
    const combinedData = { ...childProps, ...data };
    const analyzeRenderedFields = () => {
      setIsAnalyzing(true);

      // Get all the data passed to the component
      const allFields = flattenObject(combinedData);

      // Simulate checking what the child component renders
      // In a real implementation, you might use DOM analysis or other techniques
      setTimeout(() => {
        const renderedFields = findUnrenderedFields(allFields);
        setExtensionFields(renderedFields);
        setIsAnalyzing(false);
      }, 100);
    };
    if (!showExtensionFields || !combinedData) return;

    // Store original props for comparison
    originalPropsRef.current = combinedData;

    // Analyze what fields the child component actually renders
    analyzeRenderedFields();
  }, [children?.props, data, showExtensionFields]);

  const renderExtensionField = (field: ExtensionField) => {
    const { key, value, type } = field;

    const baseClasses = 'px-2 py-1 rounded text-sm';

    switch (type) {
      case 'string':
        return (
          <div
            key={key}
            className={`${baseClasses} bg-blue-50 border border-blue-200`}
          >
            <span className="font-medium text-blue-800">
              {formatFieldName(key)}:
            </span>
            <span className="ml-2 text-blue-600">{value}</span>
          </div>
        );

      case 'number':
        return (
          <div
            key={key}
            className={`${baseClasses} bg-green-50 border border-green-200`}
          >
            <span className="font-medium text-green-800">
              {formatFieldName(key)}:
            </span>
            <span className="ml-2 text-green-600 font-mono">{value}</span>
          </div>
        );

      case 'boolean':
        return (
          <div
            key={key}
            className={`${baseClasses} bg-purple-50 border border-purple-200`}
          >
            <span className="font-medium text-purple-800">
              {formatFieldName(key)}:
            </span>
            <span
              className={`ml-2 px-1 py-0.5 rounded text-xs ${
                value
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }`}
            >
              {value ? 'Yes' : 'No'}
            </span>
          </div>
        );

      case 'array':
        return (
          <div
            key={key}
            className={`${baseClasses} bg-orange-50 border border-orange-200`}
          >
            <span className="font-medium text-orange-800">
              {formatFieldName(key)}:
            </span>
            <span className="ml-2 text-orange-600">
              [{Array.isArray(value) ? value.length : 0} items]
            </span>
          </div>
        );

      case 'object':
        return (
          <div
            key={key}
            className={`${baseClasses} bg-gray-50 border border-gray-200`}
          >
            <span className="font-medium text-gray-800">
              {formatFieldName(key)}:
            </span>
            <div className="ml-2 mt-1 text-xs text-gray-600 font-mono">
              {JSON.stringify(value, null, 2)}
            </div>
          </div>
        );

      default:
        return (
          <div
            key={key}
            className={`${baseClasses} bg-gray-50 border border-gray-200`}
          >
            <span className="font-medium text-gray-800">
              {formatFieldName(key)}:
            </span>
            <span className="ml-2 text-gray-600">{String(value)}</span>
          </div>
        );
    }
  };

  const formatFieldName = (key: string): string => {
    return (
      key
        .split('.')
        .pop()
        ?.replace(/([A-Z])/g, ' $1')
        .replace(/^./, (str) => str.toUpperCase()) || key
    );
  };

  const renderExtensionFields = () => {
    if (!showExtensionFields || extensionFields.length === 0) return null;

    return (
      <div className="extension-fields border-t border-gray-200 pt-3 mt-3">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
          <span className="text-xs font-medium text-gray-600 uppercase tracking-wide">
            Extension Fields
          </span>
        </div>
        <div className="space-y-2">
          {extensionFields.map(renderExtensionField)}
        </div>
        {isAnalyzing && (
          <div className="text-xs text-gray-500 mt-2 flex items-center gap-1">
            <div className="w-3 h-3 border border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
            Analyzing extension data...
          </div>
        )}
      </div>
    );
  };

  const wrapperClass = `extension-wrapper ${className}`;

  // Ensure children exists and extract props safely
  if (!children) {
    return (
      <div className="text-red-500">
        ExtensionWrapper: No child component provided
      </div>
    );
  }

  if (extensionFieldsPosition === 'side') {
    return (
      <div className={`${wrapperClass} flex gap-4`}>
        <div className="flex-1" ref={childRef}>
          {children}
        </div>
        <div className="w-64 flex-shrink-0">{renderExtensionFields()}</div>
      </div>
    );
  }

  return (
    <div className={wrapperClass} ref={childRef}>
      {extensionFieldsPosition === 'top' && renderExtensionFields()}

      <div className="original-component">{children}</div>

      {extensionFieldsPosition === 'bottom' && renderExtensionFields()}
    </div>
  );
}
