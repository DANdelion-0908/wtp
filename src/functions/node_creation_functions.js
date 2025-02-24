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

async function createUser(driver, username, password, email, born, first_name, last_name, gender) {
    /**
     * Creates a User node with specified attributes.
     *
     * @param {neo4j.Driver} driver - The Neo4j driver instance.
     * @param {string} username - The username of the user.
     * @param {string} password - The password of the user.
     * @param {string} email - The email of the user.
     * @param {Date} born - The birthdate of the user. Format: YYYY-MM-DD
     * @param {string} first_name - The first name of the user.
     * @param {string} last_name - The last name of the user.
     * @param {string} gender - The gender of the user (Female, Male, NonBinary, NotSpecified).
     */

    const label = "User";
    const query = `
        CREATE (u:${label} {
            username: $username,
            password: $password,
            email: $email,
            born: $born,
            first_name: $first_name,
            last_name: $last_name,
            gender: $gender,
            followers: 0,
            following: 0,
            verified: false
        })
    `;

    const session = driver.session({ database: 'neo4j' });

    try {
        await session.run(query, { username, password, email, born, first_name, last_name, gender });
        console.log("User created successfully.");
    } catch (error) {
        console.error("Error executing query:", error);
    } finally {
        await session.close();
    }
}
