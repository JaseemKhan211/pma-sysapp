import { useRouter } from 'next/navigation';
import { createSystem, updateSystem, deleteSystem, getSystem, getAllSystems } from '@/services/system';
import { 
  showCreateSuccess,
  confirmCreate, 
  showUpdateSuccess, 
  confirmUpdate, 
  showDeleteSuccess, 
  confirmDelete, 
  showsAlert 
} from '@/utils/alert';

// CREATE SYSTEM
export const useCreateSystemHandler = () => {
  const router = useRouter();

  const handleCreateSystem = async (systemData) => {
    const result = await confirmCreate();

    if (result.isConfirmed) {
      const response = await createSystem(systemData);

      if (response) {
        await showCreateSuccess();
        router.push("/dashboard/connection");
      } else {
        await showAlert("error", "Error!", "Failed to create system");
      }
    }
  };

  return { handleCreateSystem };
};

// UPDATE SYSTEM
export const useUpdateSystemHandler = () => {
  const router = useRouter();

  const handleUpdateSystem = async (systemData) => {
    const result = await confirmUpdate();

    if (result.isConfirmed) {
      const response = await updateSystem(systemData);

      if (response) {
        await showUpdateSuccess();
        router.push("/dashboard/connection");
      } else {
        await showAlert(
          "error", 
          "Error!", 
          "Failed to update system"
        );
      }
    } else if (result.isDenied) {
      await showAlert(
        "info", 
        "Changes not saved", 
        ""
      );
    }
  };

  return { handleUpdateSystem };
};

// DELETE SYSTEM
export const useDeleteSystemHandler = () => {
  const router = useRouter();

  const handleDeleteSystem = async (systemid) => {
    const result = await confirmDelete();

    if (result.isConfirmed) {
      const response = await deleteSystem(systemid);

      if (response) {
        await showDeleteSuccess();
        router.push("/dashboard/connection");
      } else {
        await showAlert("error", "Error!", "Failed to delete system");
      }
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

