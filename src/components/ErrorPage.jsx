export default function ErrorPage({message, statusCode}) {
  return (
    <div className="flex items-center justify-center min-h-screen text-center">
      <div>
        <h1 className="text-4xl font-bold mb-4">{statusCode} - {message}</h1>
        <p className="text-gray-600">Sorry, the page you are looking for does not exist.</p>
      </div>
    </div>
  );
}