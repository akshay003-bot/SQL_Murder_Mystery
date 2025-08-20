import React, { useEffect, useRef, useState } from 'react';
import '../styles/Case.css';
import victim from "../assets/Gemini_Generated_Image_gqu5hngqu5hngqu5.png";
import crime_scene_report from "../database/Case 1/crime_scene_report.csv"

// Since I don't have access to your assets, I'm using a placeholder.
const doctor_placeholder = "https://placehold.co/300x400/2c3e50/ecf0f1?text=Dr.+Arthur\\nDwayne";

// Helper component for a single interactive terminal
const Terminal = ({ id, initialCode, pyodide, isReady }) => {
    const editorRef = useRef(null);
    const [output, setOutput] = useState('');
    const initialCodeRef = useRef(initialCode); // Store initial code to prevent re-renders

    // Initialize Monaco Editor
    useEffect(() => {
        const editorElement = document.getElementById(`editor${id}`);
        // Ensure monaco is loaded and the editor isn't already created
        if (window.monaco && editorElement && !editorRef.current) {
            editorRef.current = window.monaco.editor.create(editorElement, {
                value: initialCodeRef.current,
                language: 'python',
                theme: 'vs-dark',
                minimap: { enabled: false },
                fontSize: 14,
                lineNumbers: 'on',
                automaticLayout: true, // This helps the editor resize correctly
            });
        }
        // Cleanup on unmount
        return () => {
            editorRef.current?.dispose();
            editorRef.current = null;
        };
    }, [id, isReady]); // Depend on isReady to ensure monaco is loaded

    const handleRun = async () => {
        if (!pyodide || !editorRef.current) return;
        setOutput('Executing code...');
        const code = editorRef.current.getValue();
        try {
            // Redirect print statements to a variable for capture
            await pyodide.runPythonAsync(`
                import io
                import sys
                from pyodide.ffi import to_js
                sys.stdout = io.StringIO()
            `);
            let result = await pyodide.runPythonAsync(code);
            let stdout = pyodide.runPython("sys.stdout.getvalue()");
            
            let finalOutput = stdout;
            if (result !== undefined && result !== null) {
                // If the result is a pandas DataFrame, convert it to HTML
                if (result.to_html) {
                    finalOutput += result.to_html();
                } else {
                    finalOutput += result.toString();
                }
            }
            setOutput(finalOutput || 'Code executed successfully (No output).');
        } catch (err) {
            setOutput(`Error: \n${err.message}`);
        }
    };

    const handleReset = () => {
        if (editorRef.current) {
            editorRef.current.setValue(initialCodeRef.current);
        }
    };

    return (
        <>
            <div className="interactive-terminal-placeholder">
                <div className="terminal-header">pandas_forensics_interface.py</div>
                <div className="terminal-body" id={`editor${id}`} style={{ textAlign: "left" }}>
                    {/* Monaco Editor will be mounted here */}
                </div>
            </div>
            <div className='buttons'>
                <button onClick={handleRun} className="get-started-button" disabled={!isReady}>
                    {isReady ? 'Run Code' : 'Loading Environment...'}
                </button>
                <button onClick={handleReset} className="get-started-button" disabled={!isReady}>
                    Reset Code
                </button>
            </div>
            {/* Using a div for output to properly render HTML tables from pandas */}
            <div className='mission-briefing output-area' dangerouslySetInnerHTML={{ __html: output }}></div>
        </>
    );
};


const Case1 = () => {
    const [pyodide, setPyodide] = useState(null);
    const [isReady, setIsReady] = useState(false);
    const hasInitialized = useRef(false);

    // This effect runs only once to load scripts and initialize Pyodide
    useEffect(() => {
        // Prevent re-initialization on component re-renders
        if (hasInitialized.current) return;
        hasInitialized.current = true;

        const loadScript = (src) => {
            return new Promise((resolve, reject) => {
                const script = document.createElement('script');
                script.src = src;
                script.onload = resolve;
                script.onerror = reject;
                document.body.appendChild(script);
            });
        };

        const initializeEnvironment = async () => {
            try {
                // Step 1: Load Monaco Editor's loader script
                await loadScript('https://cdn.jsdelivr.net/npm/monaco-editor@0.44.0/min/vs/loader.js');
                
                // Step 2: Configure Monaco's paths and wait for its main script to load
                await new Promise(resolve => {
                    window.require.config({ paths: { 'vs': 'https://cdn.jsdelivr.net/npm/monaco-editor@0.44.0/min/vs' } });
                    window.require(['vs/editor/editor.main'], resolve);
                });
                console.log('Monaco Editor loaded successfully.');

                // Step 3: Load Pyodide script ONLY after Monaco is ready
                await loadScript('https://cdn.jsdelivr.net/pyodide/v0.25.1/full/pyodide.js');
                console.log('Pyodide script loaded. Initializing Pyodide runtime...');
                
                // Step 4: Initialize Pyodide with an explicit indexURL to prevent path parsing errors
                const pyodideInstance = await window.loadPyodide({
                    indexURL: "https://cdn.jsdelivr.net/pyodide/v0.25.1/full/"
                });
                await pyodideInstance.loadPackage("pandas");
                console.log('Pyodide runtime and Pandas package ready.');

                // --- MOCK CSV DATA ---
                const csvFiles = {
                    "crime_scene_report.csv": crime_scene_report,
                    "people.csv": `person_id,name,address,occupation\n101,Arthur Dwayne,Flat 285, Wisteria Lane,Cardiologist\n102,Sarah Jenkins,Flat 284, Wisteria Lane,Graphic Designer\n103,Edmund Muse,Downstreet,Watchman\n104,Clara Dwayne,Flat 285, Wisteria Lane,Lawyer`,
                    "interviews.csv": `person_id,transcript\n102,"I heard a loud shout around 9 PM, then a door slam and someone running down the stairs. It was all over so quickly."\n103,"A science teacher from my daughter's school kept asking about the doctor. Seemed a bit obsessed. Came by a few times."\n104,"I suspect two people. A jealous cardiologist, Dr. Enzo, and a junior doctor Arthur fired, Bennet Mathew."`
                };

                for (const [fileName, data] of Object.entries(csvFiles)) {
                    pyodideInstance.FS.writeFile(fileName, data, { encoding: "utf8" });
                }
                
                // Pre-load data into pandas dataframes
                await pyodideInstance.runPythonAsync(`
                    import pandas as pd
                    crime_scene_df = pd.read_csv('crime_scene_report.csv')
                    people_df = pd.read_csv('people.csv')
                    interviews_df = pd.read_csv('interviews.csv')
                    pd.set_option('display.max_columns', None) 
                    pd.set_option('display.width', None)
                    pd.set_option('display.max_colwidth', None)
                    print("Forensics environment ready. DataFrames 'crime_scene_df', 'people_df', and 'interviews_df' are loaded.")
                `);

                setPyodide(pyodideInstance);
                setIsReady(true);
                console.log('Initialization complete. Application is ready.');
            } catch (error) {
                console.error('Environment initialization failed:', error);
            }
        };

        initializeEnvironment();
        
    }, []);


    return (
        <>
        <main className="case-page-container">
            <div className="dossier">
                <header className="dossier-header">
                    <h1 style={{ color: "#c23616" }}>Case File: 8L0-K9D</h1>
                    <div className="classified-stamp">Top Secret</div>
                </header>

                <div className="case-content">
                    <section className="terminal-section">
                        <h2>System Access: City Database</h2>
                        <p className="mission-briefing">
                            The monsoon rains lash against the city, but inside the upscale of Haven Woods Society, a different kind of storm has passed. Dr. Arthur Dwayne, a brilliant and controversial surgeon, has been found murdered in his flat. The Police Department is stumped, and they've called you in—a specialist in data. Your mission is to analyze the digital case files to cut through the lies, expose the red herrings, and uncover the truth. The entire case folder has been loaded for you. It's time to get to work, Detective.
                        </p>
                        <p className="mission-briefing" style={{textAlign: "left"}}>
                            <strong>Run this query to find the names of the tables in this database.</strong> <br /> This command is specific to Python and SQlite.
                        </p>
                        
                        <Terminal id={1} initialCode={`import sqlite3\nimport pandas as pd\n# connect to your database (replace 'mydb.sqlite' with your file)\nconn = sqlite3.connect('mydb.sqlite')\n\n# run the query directly into a pandas DataFrame\ndf = pd.read_sql_query("SELECT name FROM sqlite_master WHERE type='table';", conn)\n\nprint(df)\n\n# close connection\nconn.close()`} pyodide={pyodide} isReady={isReady} />

                        <p className="mission-briefing">
                            Besides knowing the table names, you need to know how each table is structured. The way this works is also dependent upon which database technology you use. Here's how you do it with Pandas. <br /> <br />

<strong>Run this query to find the structure of the `crime_scene_report` table</strong><br />
Change the value of 'name' to see the structure of the other tables you learned about with the previous query.
                        </p>


                        <Terminal id={2} initialCode={"# Filter the DataFrame for the correct date\ncrime_scene_df[crime_scene_df['date'] == '2025-08-26']"} pyodide={pyodide} isReady={isReady} />
                        
                        <p className="mission-briefing">
                            The Schema for the databases required for the game is given below:
                            <img src="https://mystery.knightlab.com/schema.png" style={{borderRadius: "10px"}} />
                        </p>
                        <p className="mission-briefing">
                            <strong>The rest is up to you!<br /> Use your knowledge of the database schema and SQL commands to find out who committed the murder.
                            </strong><br />
                            When you think you know the answer, go to the next section.
                        </p>

                        
                        <Terminal id={3} initialCode={"# You can merge or query these DataFrames to find the interviews.\n# Start by inspecting the people_df\npeople_df.head()"} pyodide={pyodide} isReady={isReady} />

                        <p className="mission-briefing">
                            <strong>Check your Answer!<br /> When you think you know the killer, enter their full name below.
                            </strong>
                        </p>
                        
                        <Terminal id={4} initialCode={'# Enter the name of the murderer in a string\nmurderer = ""\nprint(f"Submitting {murderer} as the killer...")'} pyodide={pyodide} isReady={isReady} />

                    </section>

                    <aside className="evidence-locker">
                        <h3>Evidence & Reports</h3>
                        <div className="report">
                            <h4>Victim Profile</h4>
                            <img
                                src={victim}
                                alt="Victim Photo"
                                className="victim-photo"
                            />
                            <p>
                                <strong>Name:</strong> Dr. Arthur Dwayne<br />
                                <strong>Occupation:</strong> Cardiologist<br />
                                <strong>Date:</strong> 25/08/2025<br />
                                <strong>Location:</strong> Flat. No. 285, Haven Wood Society, Wisteria Lane<br/>
                                <strong>Status:</strong> Deceased
                            </p>
                        </div>
                    </aside>
                </div>
            </div>
        </main>
        </>
    )
}

export default Case1;
