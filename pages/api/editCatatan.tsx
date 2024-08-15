import Database from "@/utils/db";

export default async function handler(req, res) {
    if (req.method === 'PUT') {
      const { Key, titless, contents } = req.body;
      const tanggal_sekarang = new Date()
  
      if (!Key.current && !titless && !contents) {
        return res.status(400).json({ message: 'ID, Title, and Content are required' });
      }
  
      try {
        const updatedNote = await Database.note.update({
          where: { id: parseInt(Key.current) },
          data: {
            title: titless,
            content:contents,
            createdAt:tanggal_sekarang
          },
        });
        res.status(200).json(updatedNote);
      } catch (error) {
        res.status(500).json({ message: 'Failed to update note', error });
      }
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  }