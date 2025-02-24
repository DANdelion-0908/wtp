const neo4j = require('neo4j-driver');

async function createPost(driver, text, imagen, hashtags, reposted = false) {
    /**
     * Creates a Post node with specified attributes.
     *
     * @param {neo4j.Driver} driver - The Neo4j driver instance. ---------------------------- TODO: adapt to the real driver
     * @param {string} text - The content of the post.
     * @param {string} imagen - The image URL associated with the post.
     * @param {Array<string>} hashtags - A list of hashtags associated with the post.
     * @param {boolean} [reposted=false] - Whether the post has been reposted.
     */

    const label = "Post";
    const query = `
        CREATE (p:${label} {
            text: $text,
            imagen: $imagen,
            likes: 0,
            dislikes: 0,
            reposted: $reposted,
            hashtags: $hashtags
        })
    `;

    const session = driver.session({ database: 'neo4j' });

    try {
        await session.run(query, { text, imagen, reposted, hashtags });
        console.log("Post created successfully.");
    } catch (error) {
        console.error("Error executing query:", error);
    } finally {
        await session.close();
    }
}
