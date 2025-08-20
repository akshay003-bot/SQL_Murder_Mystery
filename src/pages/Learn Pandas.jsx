import React from 'react';
import '../styles/Learn Pandas.css';

const Learn = () => {
    return(
        <main className="case-page-container">
        <div className="dossier">
            <header className="dossier-header">
                <h1>Walkthrough for Pandas Beginners</h1>
                <p>If you're comfortable with data manipulation, you can skip these explanations and put your skills to the test!</p>
            </header>

            <div className="walkthrough-content">
                <article className="walkthrough-text">
                    <p>A crime has taken place and the detective needs your help. You've been given access to the crime scene data, but the report is missing. You vaguely remember the crime was a <strong>murder</strong> that occurred sometime on <strong>Jan. 15, 2018</strong> and that it took place in <strong>SQL City</strong>. Your first step is to load and inspect the police department’s crime scene data.</p>
                    <p>All the clues are buried in a huge collection of data files. You need to use the <strong>Pandas library</strong> to navigate this vast network of information. Below, we'll explain the core concepts you'll need. You can adapt the examples in any code box to search for clues.</p>

                    <h2>The Toolkit: Definitions</h2>
                    <p><strong>What is Pandas?</strong> Pandas is a powerful Python library for data manipulation and analysis. It provides data structures and functions needed to work with structured data seamlessly. Think of it as your digital forensic toolkit for sifting through evidence.</p>
                    <p><strong>What is a DataFrame?</strong> A DataFrame is the primary data structure in Pandas. It's a two-dimensional table, much like a spreadsheet or a SQL table, with rows and columns. Each column can have a different data type (text, number, etc.). We'll load our evidence files into these DataFrames to investigate.</p>
                    
                    <h2>The Blueprint: Data Relationship Diagram</h2>
                    <p>The diagram on the right is a visual representation of our data files and how they connect. Think of it as your case board. Each box represents a data file (like <code>crime_scene_report.csv</code>), listing its columns. The keys and arrows show how you can link information from one file to another to build a complete picture of the events.</p>

                    <h2>The Investigation: Running Code</h2>
                    <p>The data files are massive. Going through them line by line is impossible. This is where writing code comes in. We'll construct commands to ask specific questions of our DataFrames. Let's try a few.</p>
                    
                    <h2>How many people are in our database?</h2>
                    <p>To get the number of rows in a DataFrame, you can use <code>len()</code> or the <code>.shape</code> attribute. Try changing <code>person_df</code> to another DataFrame name from the diagram.</p>
                    <div className="code-block">
                        <div className="code-header"><span>len(person_df)</span><button className="run-button">Run</button></div>
                        <div className="code-body"># This will output the total number of people.</div>
                    </div>

                    <h2>What do we know about these people?</h2>
                    <p>To see the first few rows of a DataFrame, use the <code>.head()</code> method. We'll limit it to the first 5 records. You can change the table name or the number inside <code>head()</code>.</p>
                    <div className="code-block">
                        <div className="code-header"><span>person_df.head(5)</span><button className="run-button">Run</button></div>
                        <div className="code-body"># Shows the first 5 rows of the person data.</div>
                    </div>

                    <h2>What are the possible values for a column?</h2>
                    <p>To see all unique values in a column, use the <code>.unique()</code> method. This is great for understanding categorical data, like the types of crimes reported.</p>
                    <div className="code-block">
                        <div className="code-header"><span>crime_scene_df['type'].unique()</span><button className="run-button">Run</button></div>
                        <div className="code-body"># Lists all unique crime types.</div>
                    </div>

                    <h2>Filtering the Evidence</h2>
                    <p>The most crucial skill is filtering. The <code>WHERE</code> clause in SQL is equivalent to boolean indexing in Pandas. You pass a condition inside square brackets <code>[]</code> to the DataFrame.</p>
                    <p>Here's how to get everything about a specific person. Note that you use <code>==</code> for comparison.</p>
                    <div className="code-block">
                        <div className="code-header"><span>person_df[person_df['name'] == 'Kinsey Erickson']</span><button className="run-button">Run</button></div>
                        <div className="code-body"># Finds the record for 'Kinsey Erickson'.</div>
                    </div>

                    <p>Use the <code>&</code> (AND) operator to combine multiple conditions. This query finds a specific type of crime in a specific city. See if you can edit this to find your first clue!</p>
                    <div className="code-block">
                        <div className="code-header"><span>crime_scene_df[(crime_scene_df['type'] == 'theft') & (crime_scene_df['city'] == 'Chicago')]</span><button className="run-button">Run</button></div>
                        <div className="code-body"># Find all thefts in Chicago.</div>
                    </div>

                    <h2>Connecting the Dots: Merging DataFrames</h2>
                    <p>Often, the data you need is split across multiple files. In SQL, you'd use a <code>JOIN</code>. In Pandas, we use <code>pd.merge()</code>. This function combines DataFrames based on a common column, like a license ID or a person's name.</p>
                    <p>This example connects a person's name with their annual income from two different files.</p>
                    <div className="code-block">
                        <div className="code-header"><span>pd.merge(person_df, income_df, on='ssn')</span><button className="run-button">Run</button></div>
                        <div className="code-body"># Combines person and income data on the 'ssn' column.</div>
                    </div>

                    <h2>Go Get 'em!</h2>
                    <p>You now have the fundamental tools to solve this mystery. You'll need to inspect the data diagram, make reasonable assumptions, and combine these techniques. The truth is in the data. Good luck, Detective.</p>
                </article>

                <aside className="schematics">
                    <h3>Data Relationship Diagram</h3>
                    <img src="https://raw.githubusercontent.com/NUKnightLab/sql-murder-mystery/master/erd.png" alt="Entity Relationship Diagram" className="erd-placeholder"
                        onerror="this.onerror=null;this.src='https://placehold.co/600x800/000/fff?text=DIAGRAM+CORRUPTED';" />
                </aside>
            </div>
        </div>
    </main>
    )
}

export default Learn;