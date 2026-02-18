export async function getPatients() {
  try {
    const response = await fetch("data/patients.json"); // relative to features.html
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("Error fetching patients.json:", error);
    return [];
  }
}
