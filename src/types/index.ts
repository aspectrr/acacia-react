export interface AcaciaWrapperProps {
  children: React.ReactElement;
  data?: any;
  className?: string;
  showExtensionFields?: boolean;
  extensionFieldsPosition?: 'top' | 'bottom' | 'side';
}

export interface ExtensionField {
  key: string;
  value: any;
  type: string;
}
