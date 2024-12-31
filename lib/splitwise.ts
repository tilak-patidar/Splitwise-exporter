export async function getGroups() {
  try {
    const response = await fetch('/api/splitwise/groups')

    if (!response.ok) {
      throw new Error('Failed to fetch groups')
    }

    const data = await response.json()
    return data.groups
  } catch (error) {
    console.error('Error fetching groups:', error)
    throw error
  }
}