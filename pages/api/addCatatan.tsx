import Database from "@/utils/db";

export default async function handler(req, res) {
    if (req.method === 'POST') {
      const { title, content } = req.body;
  
      if ((title.length == 0 && content.length == 0) ) {
        return res.status(400).json({ message: 'Title and content are required' });
      }
  
      try {
        const addNote = await Database.note.create({
          data: {
            title,
            content,
          },
        });
        console.log(addNote)
        res.status(200).json(addNote);
      } catch (error) {
        res.status(500).json({ message: 'Failed to create post', error });
      }
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  }