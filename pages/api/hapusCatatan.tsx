import Database from "@/utils/db";

export default async function handler(req, res) {
  if (req.method === 'DELETE') {
    const { current } = req.body;
    try {
      await Database.note.deleteMany({
        where: { id: parseInt(current) },
      });

      res.status(200).json({ message: 'Data berhasil dihapus' });
    } catch (error) {
      res.status(500).json({ error: 'Terjadi kesalahan saat menghapus data' });
    }
  } else {
    res.status(405).json({ error: 'Metode tidak diizinkan' });
  }
}