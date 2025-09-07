import { useRouter } from 'next/navigation';
import { createSystem, updateSystem, deleteSystem, getSystem, getAllSystems } from '@/services/system';
import { showsAlert } from '@/utils/alert';

// CREATE SYSTEM
export const useCreateSystemHandler = () => {
  const router = useRouter();

  const handleCreateSystem = async (systemData) => {
    const result = await createSystem(systemData);
    if (result) {
      showsAlert(
        'success',
        'System created successfully'
      );
      setTimeout(() => {
        router.push('/dashboard/connection');
      }, 2000);
    } else {
      showsAlert(
        'error',
        'Failed to create system'
      );
    }
  };

  return { handleCreateSystem };
};

// UPDATE SYSTEM
export const useUpdateSystemHandler = () => {
  const router = useRouter();
  const handleUpdateSystem = async (systemData) => {
    const result = await updateSystem(systemData);
    if (result) {
      showsAlert(
        'success',
        'System updated successfully'
      );
      setTimeout(() => {
        router.push('/dashboard/connection');
      }, 2500);
    } else {
      showsAlert(
        'error',
        'Failed to update system'
      );
    }
  };

  return { handleUpdateSystem };
};

// DELETE SYSTEM
export const useDeleteSystemHandler = () => {
  const router = useRouter();
  const handleDeleteSystem = async (systemid) => {
    const result = await deleteSystem(systemid);
    if (result) {
      showsAlert(
        'success',
        'System deleted successfully'
      );
      setTimeout(() => {
        router.push('/dashboard/connection');
      }, 2000);
    } else {
      showsAlert(
        'error',
        'Failed to delete system'
      );
    }
  };

  return { handleDeleteSystem };
};

// GET SYSTEM
export const useGetSystemHandler = () => {
  const handleGetSystem = async (systemid) => {
    try {
      const result = await getSystem(systemid);
      if (result) {
        return result;
      } else {
        showsAlert(
        'error',
        'Failed to fetch system'
      );
    }
  } catch (err) {
    showsAlert(
      'error',
      err.message
    );
    }
  };

  return { handleGetSystem };
};

// GET ALL SYSTEMS
export const useGetAllSystemsHandler = () => {
  const handleGetAllSystems = async () => {
    try {
      const result = await getAllSystems();
      if (result) {
        return result; 
      } else {
        showsAlert(
          'error',
          'Failed to fetch systems'
        );
        return [];
      }
    } catch (err) {
      showsAlert(
        'error',
        err.message
      );
      return [];
    }
  };

  return { handleGetAllSystems };
};

