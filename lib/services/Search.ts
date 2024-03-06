import { Client } from '@elastic/elasticsearch';
// import { SearchResult } from '../DB/Models/Search';// Adjust the path as per your directory structure

// Initialize Elasticsearch client
const esClient = new Client({ node: 'http://localhost:3001' });
export async function searchService(query: string) {
    try {
        // Define search parameters
        const params = {
            index: 'posts', 
            body: {
                query: {
                    multi_match: {
                        query: query,
                        fields: ["productName", "productDescription", "oldPrice", "newPrice", "oldQuantity", "newQuantity"]
                    }
                }
            }
        };

        // Perform the search query
        // const { body } = await esClient.search(params);
        await esClient.search(params).then(function (resp) {
            var hits = resp.hits.hits;
          }, function (err) {
            console.trace(err.message);
          });

        // Extract and format the search results
        // if (body.hits.total.value > 0) {
        //     return body.hits.hits.map(hit => hit._source);
        // } else {
        //     return [];
        // }
    } catch (error) {
        console.error('Error searching posts:', error);
        throw error;
    }
}

// Example usage:
(async () => {
    try {
        const query = 'example'; // Specify the search query
        const searchResults = await searchService(query);
        console.log('Search results:', searchResults);
    } catch (error) {
        console.error('Error:', error);
    }
})();