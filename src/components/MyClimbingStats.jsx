export default function MyClimbingStats({stats}) {
  return(
    <>
      <tr className="hover:bg-gray-50">
      <td className="px-2 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
        <span className="text-sm font-medium text-gray-900">
          {stats.avgAttempts || 'N/A'}
        </span>
      </td>
      <td className="px-2 py-2 whitespace-nowrap">
        <span className="text-sm font-medium text-gray-900">
          {stats.minAttempts || 'N/A'}
        </span>
      </td>
      <td className="px-2 py-2 whitespace-nowrap">
        <span className="text-sm font-medium text-gray-700">
          {stats.maxAttempts || 'N/A'}
        </span>
      </td>
      <td className="px-2 py-2 whitespace-nowrap">
        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
          {stats.avgRating || 'N/A'}
        </span>
      </td>
      <td className="px-2 py-2 whitespace-nowrap">
        <span className="text-sm text-gray-700">
          {stats.minRating || 'N/A'}
        </span>
      </td>
      <td className="px-2 py-2 whitespace-nowrap">
        <span className="text-sm text-gray-700">
          {stats.maxRating || 'N/A'}
        </span>
      </td>
      </tr>
    </>
  )
}