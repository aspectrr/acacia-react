import AcaciaWrapper from '../src/components/AcaciaWrapper';

// Example usage component to demonstrate
export default function ExampleUsage() {
  // Simulate a user object that might come from an API
  const user = {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    // These would be added by extensions
    aiScore: 87,
    extensionData: {
      lastModified: new Date().toISOString(),
      source: 'extension-proxy',
      generatedBy: 'AI Assistant',
    },
    computedRating: 'Excellent',
    enhancedProfile: true,
    analysisMetadata: {
      confidence: 0.92,
      processed: true,
    },
  };

  // Original UserCard component (user's existing component)
  const UserCard = ({ user }: { user: any }) => (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold">{user.name}</h3>
      <p className="text-gray-600">{user.email}</p>
      <div className="mt-2 text-sm text-gray-500">ID: {user.id}</div>
    </div>
  );

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-8">Extension Wrapper Demo</h1>

      <div className="space-y-8">
        <div>
          <h2 className="text-lg font-semibold mb-4">
            Bottom Position (Default)
          </h2>
          <AcaciaWrapper data={user}>
            <UserCard user={user} />
          </AcaciaWrapper>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-4">Side Position</h2>
          <AcaciaWrapper data={user} extensionFieldsPosition="side">
            <UserCard user={user} />
          </AcaciaWrapper>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-4">Top Position</h2>
          <AcaciaWrapper data={user} extensionFieldsPosition="top">
            <UserCard user={user} />
          </AcaciaWrapper>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-4">
            Extension Fields Hidden
          </h2>
          <AcaciaWrapper data={user} showExtensionFields={false}>
            <UserCard user={user} />
          </AcaciaWrapper>
        </div>
      </div>
    </div>
  );
}
