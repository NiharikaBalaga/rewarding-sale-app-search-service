import PostModel from '../DB/Models/Post';

export async function searchPosts(query: string){
  return PostModel.find({
    $text: {
      $search: query
    }
  }).sort({
    createdAt: 'descending'
  }).limit(20).exec();
}

