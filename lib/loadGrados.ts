export async function loadPosts() {
    // Call an external API endpoint to get posts
    const res = await fetch('https://.../posts/')
    const data = await res.json()
  
    return data
  }