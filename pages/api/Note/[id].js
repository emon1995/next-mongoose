import dbConnect from '../../../utils/dbConnect';
import Note from '../../../models/Note';
import { typographyVariant } from '@mui/system';

dbConnect();

export default async(req, res) => {
    const {method, query:{id}} = req;

    switch(method){
        case 'GET':
            try{
                const note = await Note.findById(id);

                if(!note){
                    return res.status(400).json({success: false})
                }

                res.status(200).json({success: true, data: note})
            }catch(error){
                res.status(400).json({success: false})
            }
            break;
        case 'PUT':
            try{
                const note = await Note.findOneAndUpdate(id, req.body, {
                    new: true,
                    runValidators: true,
                })

                if(!note){
                    return res.status(400).json({success: false})
                }

                res.status(200).json({success: true, data: note})
            }catch(error){
                return res.status(400).json({success: false})
            }
            break;
        case 'DELETE':
            try{
                const deleteNote = await Note.deleteOne({_id: id})

                if(!deleteNote){
                    res.status(400).json({success: false})
                }

                res.status(200).json({success: true, data: {}})
            }catch(error){
                res.status(400).json({success: false})
            }
            break;
        default:
            res.status(400).json({success: false})
            break;
    }
}