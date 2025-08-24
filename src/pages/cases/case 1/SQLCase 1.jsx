import React, { useEffect, useRef, useState } from 'react';
import "../styles/Case.css";
import doctor_placeholder from "../assets/Gemini_Generated_Image_gqu5hngqu5hngqu5.png";
import crime_scene_reports from "../database/Case 1/crime_scene_report.csv?raw";
import personnel from "../database/Case 1/personnel.csv?raw";
import interviews from "../database/Case 1/interviews.csv?raw";
import hospital_employees from "../database/Case 1/hospital_employees.csv?raw";
import school_employees from "../database/Case 1/school_employees.csv?raw";
import patient_records from "../database/Case 1/patient_records.csv?raw";
import immigration_list from "../database/Case 1/immigration_list.csv?raw";
import dead_patient_records from "../database/Case 1/dead_patient_records.csv?raw";
import driver_license from "../database/Case 1/driver_license.csv?raw"
import financial_transactions from "../database/Case 1/financial_transactions.csv?raw";
import smart_assistant_recordings from "../database/Case 1/smart_assistant_recordings.csv?raw";
import phone_call_data from "../database/Case 1/phone_call_data.csv?raw";
import apartment_employees from "../database/Case 1/apartment_employees.csv?raw";

// Since I don't have access to your assets, I'm using a placeholder.
// Helper function to format SQL results into an HTML table
const formatSqlOutput = (results) => {
    if (!results || results.length === 0) {
        return "Query executed successfully (No output).";
    }
    let html = '';
    results.forEach(res => {
        html += '<table><thead><tr>';
        res.columns.forEach(col => { html += `<th>${col}</th>`; });
        html += '</tr></thead><tbody>';
        res.values.forEach(row => {
            html += '<tr>';
            row.forEach(cell => { html += `<td>${cell}</td>`; });
            html += '</tr>';
        });
        html += '</tbody></table>';
    });
    return html;
};

// Helper component for a single interactive terminal
const Terminal = ({ id, initialCode, db, isReady }) => {
    const editorRef = useRef(null);
    const [output, setOutput] = useState('');
    const initialCodeRef = useRef(initialCode);

    // Initialize Monaco Editor
    useEffect(() => {
        const editorElement = document.getElementById(`editor${id}`);
        if (window.monaco && editorElement && !editorRef.current) {
            editorRef.current = window.monaco.editor.create(editorElement, {
                value: initialCodeRef.current,
                language: 'sql',
                theme: 'vs-dark',
                minimap: { enabled: false },
                fontSize: 14,
                lineNumbers: 'on',
                automaticLayout: true,
            });
        }
        return () => {
            editorRef.current?.dispose();
            editorRef.current = null;
        };
    }, [id, isReady]);

    const handleRun = () => {
        if (!db || !editorRef.current) return;
        setOutput('Executing query...');
        const sqlQuery = editorRef.current.getValue();
        try {
            const results = db.exec(sqlQuery);
            setOutput(formatSqlOutput(results));
        } catch (err) {
            setOutput(`Error: \n${err.message}`);
        }
    };

    const handleReset = () => {
        if (editorRef.current) {
            editorRef.current.setValue(initialCodeRef.current);
            setOutput('');
        }
    };

    return (
        <>
            <div className="interactive-terminal-placeholder">
                <div className="terminal-header">sql_forensics_interface.sql</div>
                <div className="terminal-body" id={`editor${id}`} style={{ textAlign: "left" }}>
                    {/* Monaco Editor will be mounted here */}
                </div>
            </div>
            <div className='buttons'>
                <button onClick={handleRun} className="get-started-button" disabled={!isReady}>
                    {isReady ? 'Run Query' : 'Loading Database...'}
                </button>
                <button onClick={handleReset} className="get-started-button" disabled={!isReady}>
                    Reset Query
                </button>
            </div>
            <div className='mission-briefing output-area' dangerouslySetInnerHTML={{ __html: output }}></div>
        </>
    );
};

const Case1 = () => {
    const [db, setDb] = useState(null);
    const [isReady, setIsReady] = useState(false);
    const [answer, setAnswer] = useState('');
    const [lives, setLives] = useState(3);
    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');
    const [showWrongAnswer, setShowWrongAnswer] = useState(false);
    const [wrongAnswerMessage, setWrongAnswerMessage] = useState('');
    const hasInitialized = useRef(false);

    // Confetti effect function
    const createConfetti = () => {
        const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
        const container = document.querySelector('.case-page-container');
        
        for (let i = 0; i < 150; i++) {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.width = '10px';
            confetti.style.height = '10px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.borderRadius = '50%';
            confetti.style.zIndex = '1000';
            confetti.style.left = Math.random() * window.innerWidth + 'px';
            confetti.style.top = '-10px';
            
            container.appendChild(confetti);
            
            const animation = confetti.animate([
                { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
                { transform: `translateY(${window.innerHeight}px) rotate(${Math.random() * 360}deg)`, opacity: 0 }
            ], {
                duration: Math.random() * 3000 + 2000,
                easing: 'cubic-bezier(0, .9, .57, 1)'
            });
            
            animation.onfinish = () => confetti.remove();
        }
    };

    // Handle answer checking
    const handleCheckAnswer = () => {
        if (lives <= 0) return;
        
        const trimmedAnswer = answer.trim();
        
        if (trimmedAnswer === 'Peter Parkinson') {
            setPopupMessage(`Yay! You're halfway there. Peter Parkinson is the one who stabbed the doctor. Read the crime_scene_report again.
                You are surely missing something.`);
            setShowPopup(true);
        } else if (trimmedAnswer === 'Eva Maria') {
            createConfetti();
            setPopupMessage(`Correct! Eva Maria is the murderer. She slit the doctor's throat, while the doctor caught her stealing Clara's Jewellery.`);
            setShowPopup(true);
        } else {
            // Decrease lives for wrong answer
            setLives(prev => {
                const newLives = prev - 1;
                return newLives;
            });
            setWrongAnswerMessage('Incorrect answer. Try again!');
            setShowWrongAnswer(true);
            setTimeout(() => {
                setShowWrongAnswer(false);
            }, 5000);
        }
        
        setAnswer('');
    };

    // Close popup
    const closePopup = () => {
        setShowPopup(false);
    };

    // Reset function for all terminals
    const handleResetAll = () => {
        // Reset all editors to initial state
        const resetButtons = document.querySelectorAll('.get-started-button');
        resetButtons.forEach(button => {
            if (button.textContent === 'Reset Query') {
                button.click();
            }
        });
        setLives(3);
        setAnswer('');
        setShowPopup(false);
        setShowWrongAnswer(false);
    };

    // Prevent page reload
    useEffect(() => {
        const handleBeforeUnload = (event) => {
            event.preventDefault();
            event.returnValue = '';
            return '';
        };

        window.addEventListener('beforeunload', handleBeforeUnload);
        
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);

    useEffect(() => {
        if (hasInitialized.current) return;
        hasInitialized.current = true;

        const loadScript = (src) => new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = src;
            script.onload = resolve;
            script.onerror = reject;
            document.body.appendChild(script);
        });

        const initializeEnvironment = async () => {
            try {
                // Load Monaco Editor
                await loadScript('https://cdn.jsdelivr.net/npm/monaco-editor@0.44.0/min/vs/loader.js');
                await new Promise(resolve => {
                    window.require.config({ paths: { 'vs': 'https://cdn.jsdelivr.net/npm/monaco-editor@0.44.0/min/vs' } });
                    window.require(['vs/editor/editor.main'], resolve);
                });
                console.log('Monaco Editor loaded.');

                // Load sql.js
                await loadScript('https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.10.2/sql-wasm.js');
                console.log('SQL.js script loaded. Initializing database...');

                const SQL = await window.initSqlJs({
                    locateFile: file => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.10.2/${file}`
                });
                const database = new SQL.Database();
                
                // --- MOCK CSV DATA ---
                const csvFiles = {
                    "crime_scene_reports": crime_scene_reports,
                    "personnel": personnel,
                    "interviews": interviews,
                    "hospital_employees": hospital_employees,
                    "school_employees": school_employees,
                    "patient_records": patient_records,
                    "driver_license": driver_license,
                    "financial_transactions": financial_transactions,
                    "smart_assistant_recordings": smart_assistant_recordings,
                    "phone_call_data": phone_call_data,
                    "immigration_list": immigration_list,
                    "dead_patient_records": dead_patient_records,
                    "apartment_employees": apartment_employees
                };
                const fakeTableNames = [
                ];

                fakeTableNames.forEach((tableName, i) => {
                    csvFiles[tableName] = `id,data\n${i+1},"Sample data for ${tableName}"`;
                });


                // Create tables and insert data
                for (const [tableName, csvData] of Object.entries(csvFiles)) {
                    const lines = csvData.trim().split('\n');
                    const headers = lines[0].split(',');
                    
                    // Use a regex to split CSV rows that may contain commas within quoted fields
                    const values = lines.slice(1).map(line => {
                        const regex = /,(?=(?:(?:[^"]*"){2})*[^"]*$)/;
                        return line.split(regex);
                    });

                    database.run(`CREATE TABLE ${tableName} (${headers.join(' TEXT, ')} TEXT);`);
                    
                    const stmt = database.prepare(`INSERT INTO ${tableName} VALUES (${headers.map(() => '?').join(',')})`);
                    values.forEach(row => {
                        if (row.length !== headers.length) {
                            console.error(`Row length mismatch in table ${tableName}: Expected ${headers.length}, got ${row.length}`, row);
                            return; // Skip malformed row
                        }
                        const sanitizedRow = row.map(cell => cell.replace(/^"|"$/g, ''));
                        stmt.run(sanitizedRow);
                    });
                    stmt.free();
                }
                console.log('Database created and populated.');

                setDb(database);
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
        {/* --- INJECTING THE CSS --- */}
        <style>{`
            /* (Your existing CSS is placed here) */
            @import url('https://fonts.googleapis.com/css2?family=Special+Elite&family=Oswald:wght@700&family=Roboto+Mono:wght@400;700&display=swap');
            body, html { margin: 0; padding: 0; background-color: #05080a; color: #e0e0e0; font-family: 'Roboto Mono', monospace; overflow-x: hidden; }
            .case-page-container { min-height: 100vh; width: 100%; position: relative; display: flex; justify-content: center; align-items: flex-start; padding: 2rem; box-sizing: border-box; background-image: linear-gradient(rgba(5, 8, 10, 0.85), rgba(5, 8, 10, 1)), url('https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=2670&auto=format&fit=crop'); background-size: cover; background-position: center; background-attachment: fixed; }
            .dossier { width: 100%; max-width: 1400px; background: rgba(10, 15, 20, 0.8); border: 1px solid rgba(191, 170, 126, 0.2); backdrop-filter: blur(10px); border-radius: 5px; box-shadow: 0 15px 40px rgba(0,0,0,0.7); padding: 1.5rem 2rem; }
            .dossier-header { display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #bfaa7e; padding-bottom: 1rem; margin-bottom: 2rem; }
            .dossier-header h1 { font-family: 'Oswald', sans-serif; margin: 0; font-size: 2.5rem; color: #c23616; text-transform: uppercase; letter-spacing: 2px; }
            .buttons{ margin-top: 10px; margin-bottom: 15px; display: flex; justify-content: space-between; gap: 1rem; }
            .get-started-button { flex: 1; border: 2px solid #3d3d3d; background-color: transparent; color: #c23616; padding: 0.75rem 1rem; border-radius: 3px; font-family: 'Special Elite', cursive; font-size: 1rem; font-weight: bold; cursor: pointer; transition: all 0.3s ease; text-transform: uppercase; }
            .get-started-button:hover:not(:disabled) { background-color: #c23616; border-color: #c23616; color: #05080a; box-shadow: 0 0 10px rgba(194, 54, 22, 0.7); }
            .get-started-button:disabled { cursor: not-allowed; opacity: 0.5; }
            .classified-stamp { border: 4px double #c23616; color: #c23616; padding: 0.5rem 1rem; font-family: 'Oswald', sans-serif; font-size: 1.2rem; transform: rotate(-3deg); text-transform: uppercase; }
            .case-content { display: grid; grid-template-columns: 1fr; gap: 2rem; }
            @media (min-width: 1024px) { .case-content { grid-template-columns: 2fr 1fr; } }
            .terminal-section h2 { font-family: 'Oswald', sans-serif; color: #bfaa7e; font-size: 1.5rem; text-transform: uppercase; border-bottom: 1px solid rgba(191, 170, 126, 0.3); padding-bottom: 0.5rem; margin-bottom: 1rem; }
            .mission-briefing { font-family: 'Special Elite', cursive; font-size: 1.1rem; line-height: 1.8; color: #b0b0b0; text-align: left; background: rgba(0,0,0,0.2); padding: 1rem; border-left: 3px solid #bfaa7e; margin-bottom: 2rem; white-space: pre-wrap; word-wrap: break-word; }
            .output-area { min-height: 50px; }
            .output-area table { width: 100%; border-collapse: collapse; margin-top: 1rem; color: #e0e0e0; font-family: 'Roboto Mono', monospace; font-size: 0.9rem; }
            .output-area th, .output-area td { border: 1px solid #333; padding: 8px; text-align: left; }
            .output-area th { background-color: #222; font-weight: bold; }
            .interactive-terminal-placeholder { background-color: #000; border: 1px solid #333; border-radius: 4px; height: 210px; display: flex; flex-direction: column; font-family: 'Roboto Mono', monospace; box-shadow: inset 0 0 20px rgba(0, 255, 135, 0.1); }
            .terminal-header { background: #222; padding: 0.5rem 1rem; border-bottom: 1px solid #333; color: #0f0; text-align: center; }
            .terminal-body { height: 100%; flex-grow: 1; }
            .evidence-locker { background: rgba(0,0,0,0.2); padding: 1.5rem; border: 1px solid rgba(191, 170, 126, 0.2); border-radius: 4px; }
            .evidence-locker h3 { font-family: 'Oswald', sans-serif; color: #bfaa7e; font-size: 1.5rem; text-transform: uppercase; margin: 0 0 1.5rem 0; text-align: center; }
            .report { background: rgba(10, 15, 20, 0.5); margin-bottom: 1.5rem; padding: 1rem; border-radius: 3px; border-left: 3px solid #c23616; }
            .report h4 { font-family: 'Special Elite', cursive; color: #f5f5f5; margin: 0 0 0.5rem 0; font-size: 1.1rem; }
            .report p { margin: 0; color: #b0b0b0; font-size: 0.9rem; line-height: 1.6; }
            .victim-photo { filter: grayscale(100%) contrast(1.2); border: 2px solid #555; width: 100%; height: auto; margin-bottom: 1rem; }
            .answer-section { margin-top: 20px; }
            .answer-input { 
                width: 100%;
                padding: 10px;
                background: #000;
                border: 1px solid #333;
                border-radius: 4px;
                color: #e0e0e0;
                font-family: 'Roboto Mono', monospace;
                margin-bottom: 10px;
            }
            .popup {
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: rgba(10, 15, 20, 0.95);
                border: 2px solid #c23616;
                padding: 20px;
                border-radius: 5px;
                z-index: 1000;
                text-align: center;
                font-family: 'Special Elite', cursive;
                color: #c23616;
                box-shadow: 0 0 20px rgba(194, 54, 22, 0.5);
                max-width: 80%;
                width: 500px;
            }
            .popup::before {
                content: "";
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: linear-gradient(45deg, rgba(194, 54, 22, 0.1), transparent);
                z-index: -1;
            }
            .close-btn {
                position: absolute;
                top: 10px;
                right: 10px;
                background: none;
                border: none;
                color: #c23616;
                font-size: 1.5rem;
                cursor: pointer;
                font-family: 'Special Elite', cursive;
            }
            .wrong-answer {
                position: fixed;
                bottom: 20px;
                right: 20px;
                background: rgba(10, 15, 20, 0.95);
                border: 2px solid #ff0000;
                padding: 15px;
                border-radius: 5px;
                z-index: 1000;
                text-align: center;
                font-family: 'Special Elite', cursive;
                color: #ff0000;
                box-shadow: 0 0 15px rgba(255, 0, 0, 0.5);
                max-width: 300px;
            }
        `}</style>
        <main className="case-page-container">
            <div className="dossier">
                <header className="dossier-header">
                    <h1>Case File: 8L0-K9D</h1>
                    <div className="classified-stamp">Top Secret</div>
                </header>
                <div className="case-content">
                    <section className="terminal-section">
                        <h2>System Access: City Database</h2>
                        
                        {!isReady ? (
                            <div className="mission-briefing">Initializing database and forensics tools... Please wait.</div>
                        ) : (
                            <>
                                <p className="mission-briefing">
                                    The monsoon rains lash against the city, but inside the upscale Haven Woods Society, a different kind of storm has passed. Dr. Arthur Dwayne, a brilliant and controversial surgeon, has been found murdered in his flat. The Police Department is stumped, and they've called you in—a specialist in data. Your mission is to analyze the digital case files using SQL to cut through the lies and uncover the truth.
                                </p>
                                <p className="mission-briefing" style={{textAlign: "left"}}>
                                    <strong>Run this query to find the names of the tables in this database.</strong> <br /> This command is specific to SQL.
                                </p>
                                
                                <Terminal id={1} initialCode={"SELECT name FROM sqlite_master WHERE type='table';"} db={db} isReady={isReady} />

                                <p className="mission-briefing">
                            Besides knowing the table names, you need to know how each table is structured. The way this works is also dependent upon which database technology you use. Here's how you do it with SQL. <br /> <br />

<strong>Run this query to find the structure of the `crime_scene_report` table</strong><br />
Change the value of 'name' to see the structure of the other tables you learned about with the previous query.
                        </p>

                                <Terminal id={2} initialCode={"PRAGMA table_info('crime_scene_reports');"} db={db} isReady={isReady} />
                                
                                <p className="mission-briefing">
                            The Schema for the databases required for the game is given below:
                            <img src="https://mystery.knightlab.com/schema.png" style={{borderRadius: "10px"}} />
                        </p>
                        <p className="mission-briefing">
                            <strong>The rest is up to you!<br /> Use your knowledge of the database schema and SQL commands to find out who committed the murder.
                            </strong><br />
                            When you think you know the answer, go to the next section.
                        </p>
                                
                                <Terminal id={3} initialCode={""} db={db} isReady={isReady} />

                                <div className="answer-section">
                                    <p className="mission-briefing">
                                        <strong>Check your Answer!<br /> When you think you know the killer, enter their full name below.
                                        </strong>
                                    </p>
                                    <input
                                        type="text"
                                        value={answer}
                                        onChange={(e) => setAnswer(e.target.value)}
                                        className="answer-input"
                                        placeholder="Enter the criminal's name..."
                                    />
                                    <div className="buttons">
                                        <button 
                                            onClick={handleCheckAnswer} 
                                            className="get-started-button"
                                            disabled={lives <= 0}
                                        >
                                            Check Answer
                                        </button>
                                        <button 
                                            onClick={handleResetAll} 
                                            className="get-started-button"
                                        >
                                            Reset All
                                        </button>
                                        <span style={{display: 'flex', alignItems: 'center', gap: '5px'}}>
                                            Lives: {Array(lives).fill('❤️').join('')}
                                        </span>
                                    </div>
                                </div>
                            </>
                        )}

                    </section>
                    <aside className="evidence-locker">
                        <h3>Evidence & Reports</h3>
                        <div className="report">
                            <h4>Victim Profile</h4>
                            <img src={doctor_placeholder} alt="Victim Photo" className="victim-photo" />
                            <p>
                                <strong>Name:</strong> Dr. Arthur Dwayne<br />
                                <strong>Occupation:</strong> Cardiologist<br />
                                <strong>Date:</strong> 21/08/2025<br />
                                <strong>Location:</strong> Flat. No. 285, Haven Woods Society, Richmond Street, Silveridge<br/>
                                <strong>Status:</strong> Deceased
                            </p>
                        </div>
                    </aside>
                </div>
            </div>
            
            {showPopup && (
                <div className="popup">
                    <button className="close-btn" onClick={closePopup}>×</button>
                    {popupMessage}
                </div>
            )}
            
            {showWrongAnswer && (
                <div className="wrong-answer">
                    {wrongAnswerMessage}
                </div>
            )}
        </main>
        </>
    )
}

export default Case1;