import dbConnect from "../../utils/dbConnect"

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
dbConnect();
 
export default function handler(req, res) {
  res.status(200).json({ name: 'John Doe' })
}
