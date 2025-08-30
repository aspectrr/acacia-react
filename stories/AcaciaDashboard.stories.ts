import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'outline', 'ghost'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// Primary button (default)
export const Primary: Story = {
  args: {
    children: 'Button',
    variant: 'primary',
  },
};

// Secondary button
export const Secondary: Story = {
  args: {
    children: 'Button',
    variant: 'secondary',
  },
};

// Outline button
export const Outline: Story = {
  args: {
    children: 'Button',
    variant: 'outline',
  },
};

// Ghost button
export const Ghost: Story = {
  args: {
    children: 'Button',
    variant: 'ghost',
  },
};

// Different sizes
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
};
