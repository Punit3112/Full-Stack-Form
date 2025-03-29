const API_BASE_URL = 'http://localhost:5000/api';

export const api = {
  // Get all claims
  getAllClaims: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/claims`);
      if (!response.ok) {
        throw new Error('Failed to fetch claims');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching claims:', error);
      throw error;
    }
  },

  // Get a single claim
  getClaimById: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/claims/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch claim');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching claim:', error);
      throw error;
    }
  },

  // Create a new claim
  createClaim: async (claimData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/claims`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(claimData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create claim');
      }

      return await response.json();
    } catch (error) {
      console.error('Error creating claim:', error);
      throw error;
    }
  },

  // Update a claim
  updateClaim: async (id, claimData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/claims/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(claimData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update claim');
      }

      return await response.json();
    } catch (error) {
      console.error('Error updating claim:', error);
      throw error;
    }
  },

  // Delete a claim
  deleteClaim: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/claims/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete claim');
      }

      return await response.json();
    } catch (error) {
      console.error('Error deleting claim:', error);
      throw error;
    }
  },

  // Upload document
  uploadDocument: async (file) => {
    try {
      const formData = new FormData();
      formData.append('document', file);

      const response = await fetch(`${API_BASE_URL}/claims/upload`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload document');
      }

      return await response.json();
    } catch (error) {
      console.error('Error uploading document:', error);
      throw error;
    }
  },
}; 