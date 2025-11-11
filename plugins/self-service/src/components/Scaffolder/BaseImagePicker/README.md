# BaseImagePicker Field Extension

A custom field extension for Backstage scaffolder that provides an enhanced UI for selecting base images for execution environments.

## Features

- **Enhanced Visual Design**: Bold, prominent title with improved typography
- **Radio Button List**: Clean radio button interface for all enum options
- **Option Descriptions**: Individual descriptions for each enum option displayed in subscript format
- **Dynamic Configuration**: Reads options from template schema (enum, enumNames, enumDescriptions)
- **Template-Driven**: Works with any template configuration, not hardcoded values
- **Custom Styling**: Material-UI styling with custom spacing and typography
- **Accessibility**: Proper ARIA labels and keyboard navigation support

## Usage

### In Scaffolder Templates

To use this field extension in your scaffolder template, add the following to your template's `parameters` section:

```yaml
parameters:
  - title: Base Image
    description: Configure the base image for your execution environment
    properties:
      baseImage:
        title: Base execution environment image
        type: string
        default: 'registry.access.redhat.com/ubi9/python-311:latest'
        enum:
          - 'registry.access.redhat.com/ubi9/python-311:latest'
          - 'registry.redhat.io/ansible-automation-platform-25/ee-minimal-rhel9:latest'
          - 'custom'
        enumNames:
          - 'Red Hat Universal Base Image 9 w/ Python 3.11 (Recommended)'
          - 'Red Hat Ansible Minimal EE base (RHEL 9) (Requires subscription)'
          - 'Custom Image'
        enumDescriptions:
          - 'A lightweight, secure base image with Python 3.11 runtime. Perfect for most Ansible automation tasks.'
          - 'Minimal execution environment with essential Ansible components. Requires Red Hat subscription.'
          - 'Use your own custom base image. You can specify any container image from any registry.'
        ui:field: BaseImagePicker
```

### Available Base Images

1. **Red Hat Universal Base Image 9 w/ Python 3.11 (Recommended)**
   - Value: `registry.access.redhat.com/ubi9/python-311:latest`
   - Description: A lightweight, secure base image with Python 3.11 pre-installed. Perfect for most Ansible automation tasks with minimal overhead.

2. **Red Hat Ansible Minimal EE base (RHEL 9) (Requires subscription)**
   - Value: `registry.redhat.io/ansible-automation-platform-25/ee-minimal-rhel9:latest`
   - Description: Minimal execution environment optimized for Ansible Automation Platform. Requires Red Hat subscription for access.

3. **Custom Image**
   - Value: `custom`
   - Description: Use your own custom base image. Provide the full image path including registry, namespace, and tag.

### Custom Image Input

When the "Custom Image" option is selected, the component shows:

- A text input field for entering the custom image URL
- Placeholder text: `e.g., quay.io/org/custom-ee:latest`
- Help text: `Format: [registry[:port]/][namespace/]name[:tag]`

## Implementation Details

### Component Structure

- **BaseImagePickerExtension**: Main React component
- **BaseImagePickerFieldSchema**: JSON schema definition
- **BaseImagePickerFieldExtension**: Backstage field extension registration

### Styling

The component uses Material-UI's `makeStyles` for styling and includes:

- Custom card layouts for each option
- Hover effects and selection states
- Responsive design with proper spacing
- Color-coded tags for different option types

### Testing

The component includes comprehensive tests covering:

- Rendering of all options
- User interactions (clicking, typing)
- Custom image input handling
- Proper onChange callbacks

## Dependencies

- `@backstage/plugin-scaffolder-react`
- `@material-ui/core`
- `@material-ui/icons`
- `react`

## Export

The field extension is exported from the main plugin index:

```typescript
export { BaseImagePickerFieldExtension } from './components/Scaffolder/BaseImagePicker/extensions';
```

This allows other parts of the application to import and use the field extension.
