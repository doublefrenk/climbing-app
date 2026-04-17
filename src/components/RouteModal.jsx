import Modal from 'react-modal';


// Set the app element for accessibility
Modal.setAppElement('#root');
export default function RouteModal({route, isOpen, onClose}){
  return(
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="max-w-2xl mx-auto mt-20 bg-white rounded-lg shadow-xl p-6 max-h-[90vh] overflow-y-auto"
      overlayClassName="fixed inset-0 bg-black/30 backdrop-blur-lg flex items-center justify-center z-50"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Route detail</h2>
        <button 
          onClick={onClose} 
          className="text-gray-500 hover:text-gray-700 text-2xl w-8 h-8 flex items-center justify-center"
        >
          ✕
        </button>
      </div>
      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-emerald-500 mb-1">Title</label>
            <p className="text-gray-900 bg-gray-50 px-3 py-2 rounded-md">{route?.title || 'N/A'}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-emerald-500 mb-1">Grade</label>
            <p className="text-gray-900 bg-gray-50 px-3 py-2 rounded-md">{route?.grade || 'N/A'}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-emerald-500 mb-1">Sector</label>
            <p className="text-gray-900 bg-gray-50 px-3 py-2 rounded-md">{route?.sector || 'N/A'}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-emerald-500 mb-1">Rating</label>
            <p className="text-gray-900 bg-gray-50 px-3 py-2 rounded-md">{route?.rating || 'N/A'}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-emerald-500 mb-1">Genre</label>
            <p className="text-gray-900 bg-gray-50 px-3 py-2 rounded-md">{route?.genre || 'N/A'}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-emerald-500 mb-1">Video</label>
            <p className="text-gray-900 bg-gray-50 px-3 py-2 rounded-md">{route?.video || 'N/A'}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-emerald-500 mb-1">Photo</label>
            <p className="text-gray-900 bg-gray-50 px-3 py-2 rounded-md">{route?.photo || 'N/A'}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-emerald-500 mb-1">No. Attempts</label>
            <p className="text-gray-900 bg-gray-50 px-3 py-2 rounded-md">{route?.attempts || 'N/A'}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-emerald-500 mb-1">Send Date</label>
            <p className="text-gray-900 bg-gray-50 px-3 py-2 rounded-md">{route?.sendDate || 'N/A'}</p>
          </div>
        </div>
        <div>
            <label className="block text-sm font-medium text-emerald-500 mb-1">Comments</label>
            <p className="text-gray-900 bg-gray-50 px-3 py-2 rounded-md">{route?.comments[0] || 'N/A'}</p>
        </div>
      </div>
      </Modal>
  )
}