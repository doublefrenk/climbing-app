import { useForm } from 'react-hook-form';
import Modal from 'react-modal';

Modal.setAppElement('#root');

export default function EditRouteModal({ onSave, isOpen, onClose, route }) {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    defaultValues: {
      title: route?.title || '',
      grade: route?.grade || '',
      sector: route?.sector || '',
      rating: route?.rating || '',
      genre: route?.genre || '',
      video: route?.video || '',
      photo: route?.photo || '',
      attempts: route?.attempts || '',
      sendDate: route?.sendDate || '',
      comments: route?.comments[0] || ''
    }
  });

  const onSubmit =  (data) => {
    console.log('Submitting data:', data);
    const updatedRoute = { ...route, ...data, comments: [data.comments] };
    onSave(route.id,updatedRoute);
    onClose();
  };

  return (<Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="max-w-2xl mx-auto mt-20 bg-white rounded-lg shadow-xl p-6 max-h-[90vh] overflow-y-auto"
      overlayClassName="fixed inset-0 bg-black/30 backdrop-blur-lg flex items-center justify-center z-50"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Edit Route</h2>
        <button 
          onClick={onClose} 
          className="text-gray-500 hover:text-gray-700 text-2xl w-8 h-8 flex items-center justify-center"
        >
          ✕
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-emerald-700 mb-1">Title</label>
              <input 
                {...register('title', {
                  required: 'Title is required',
                  maxLength: { value: 100, message: 'Title cannot exceed 100 characters' }
                  })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
                    {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-emerald-700 mb-1">Grade</label>
                    <input
                      {...register('grade', {
                        required: 'Grade is required',
                        maxLength: { value: 100, message: 'Grade cannot exceed 100 characters' },
                        pattern: {
                          value: /^[1-9][abc]?[+]?$/,
                          message: 'Grade must be in French format (e.g., 6a, 7b+, 8c)'
                        }
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.grade && <p className="text-red-500 text-sm mt-1">{errors.grade.message}</p>}
                  </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-emerald-700 mb-1">Sector</label>
            <input
              {...register('sector', { required: 'sector is required' })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.sector && <p className="text-red-500 text-sm mt-1">{errors.sector.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-emerald-700 mb-1">Rating</label>
            <input
              {...register('rating', { required: 'rating is required' })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.rating && <p className="text-red-500 text-sm mt-1">{errors.rating.message}</p>}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-emerald-700 mb-1">Genre</label>
            <input
              {...register('genre', { required: 'genre is required' })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.genre && <p className="text-red-500 text-sm mt-1">{errors.genre.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-emerald-700 mb-1">Photo</label>
            <input
              {...register('photo')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-emerald-700 mb-1">Video</label>
            <input
              {...register('video')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-emerald-700 mb-1">No. Attempts</label>
            <input
              type="number"
              {...register('attempts', { required: 'attempts is required' })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.attempts && <p className="text-red-500 text-sm mt-1">{errors.attempts.message}</p>}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Send Date</label>
          <input
            type="date"
            {...register('sendDate', { required: 'Send date is required' })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.sendDate && <p className="text-red-500 text-sm mt-1">{errors.sendDate.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Comments</label>
          <textarea
            {...register('comments', {
              maxLength: { value: 500, message: 'comments cannot exceed 500 characters' }
            })}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.comments && <p className="text-red-500 text-sm mt-1">{errors.comments.message}</p>}
        </div>

        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {isSubmitting ? 'Saving...' : 'Save Changes'}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </form>
    </Modal>)
}