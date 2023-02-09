declare global {
  interface TextField {
    title: string;
    type: string;
    maxLength?: number;
  }

  interface NumberField {
    title: string;
    type: string;
    min?: number;
    max?: number;
  }

  interface BooleanField {
    title: string;
    type: string;
    isChecked?: boolean;
  }

  interface DropdownField {
    title: string;
    type: string;
    options?: string[];
    default?: number;
  }

  interface TimeField {
    title: string;
    type: string;
  }

  interface MasterField
    extends TextField,
      NumberField,
      BooleanField,
      DropdownField,
      Dropdown {}
}

export {};
