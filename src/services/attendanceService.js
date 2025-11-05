import api from "./api"; // axios instance


// ---------------- CSV Upload ----------------
export const uploadCsv = async (file) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await api.post("/attendance/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data; // { created: number } or { error: string }
  } catch (error) {
    console.error("CSV upload failed:", error.response?.data || error.message);
    return { error: error.response?.data?.error || "Upload failed" };
  }
};

// ---------------- Add Manual Attendance ----------------
export const addAttendance = async (attendanceData) => {
  try {
    const response = await api.post("/attendance", attendanceData);
    return response.data;
  } catch (error) {
    console.error("Add attendance failed:", error.response?.data || error.message);
    throw error;
  }
};

// ---------------- Get Attendance Records ----------------
export const getAttendanceRecords = async () => {
  try {
    const response = await api.get("/attendance");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch attendance:", error);
    throw error;
  }
};

// ---------------- Delete Attendance Record (optional) ----------------
export const deleteAttendance = async (id) => {
  try {
    const response = await api.delete(`/attendance/${id}`);
    return response.data;
  } catch (error) {
    console.error("Delete attendance failed:", error);
    throw error;
  }
};

