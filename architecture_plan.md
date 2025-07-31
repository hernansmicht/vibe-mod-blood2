# Blood Code: Forensic Analysis Game - Architectural Plan

## 1. Overall Application Architecture

The game will be a single-screen experience built using Next.js and React. State management for game phases and data will primarily leverage React's `useState` and `useReducer` hooks.

### Application State

*   **`currentPhase`**: Manages the active game phase (Pattern Recognition, Timeline Reconstruction, Deduction, Result).
*   **`identifiedPatterns`**: Stores details of blood patterns correctly identified by the player (type, location, implication).
*   **`timelineEvents`**: Stores the reconstructed sequence of events based on player deductions.
*   **`deductionQuestions`**: Contains the questions, options, and correct answers for the deduction phase.
*   **`playerAnswers`**: Records the player's selected answers for deduction questions.
*   **`currentCase`**: Holds all data for the active crime case.

### Component Hierarchy

The application will be structured around a main container component (`App` or `page.tsx`) that orchestrates the game flow and conditionally renders phase-specific components.

*   **`App` (or `page.tsx`)**:
    *   Manages the `currentPhase` state.
    *   Renders `CrimeSceneDisplay` (static background).
    *   Conditionally renders `PatternRecognitionPhase`, `TimelineReconstructionPhase`, `DeductionPhase`, or `ResultDisplay` based on `currentPhase`.

*   **`CrimeSceneDisplay`**:
    *   Displays the main crime scene image.
    *   May include overlays for identified patterns or interactive hotspots.

*   **`PatternRecognitionPhase`**:
    *   Active during Phase 1.
    *   Contains `RadialTool` for pattern selection.
    *   Interacts with `PatternHotspot` components overlaid on `CrimeSceneDisplay`.
    *   Provides feedback via `FeedbackDisplay`.

*   **`RadialTool`**:
    *   Interactive radial menu for selecting blood pattern types.

*   **`PatternHotspot`**:
    *   Clickable, invisible areas on the `CrimeSceneDisplay` that trigger pattern identification.

*   **`TimelineReconstructionPhase`**:
    *   Active during Phase 2.
    *   Displays the sequence of reconstructed events.

*   **`DeductionPhase`**:
    *   Active during Phase 3.
    *   Presents multiple-choice questions.
    *   Handles player input for answers.

*   **`FeedbackDisplay`**:
    *   Displays short, clinical feedback messages (e.g., "Correct: Passive Drops").

*   **`ResultDisplay`**:
    *   Displays the final performance rank (e.g., "Clinical Analyst").

## 2. Data Structures

Static JSON files will define game content.

*   **`lib/data/bloodPatterns.json`**:
    ```json
    [
      {
        "id": "passive_drops",
        "name": "Passive Drops",
        "visualClue": "Small, round, spaced dots",
        "implication": "Blood dripped from a stationary position."
      },
      // ... other patterns
    ]
    ```

*   **`lib/data/cases.json`**:
    ```json
    [
      {
        "caseId": "case_001",
        "sceneImage": "/images/crime_scene_001.png",
        "patternsInScene": [
          {
            "patternId": "impact_spatter",
            "location": { "x": 150, "y": 200, "width": 50, "height": 50 },
            "correctPatternType": "Impact Spatter",
            "feedback": "Analysis confirms blunt-force trauma."
          },
          {
            "patternId": "drip_trail_door",
            "location": { "x": 50, "y": 300, "width": 20, "height": 100 },
            "correctPatternType": "Drip Trail",
            "feedback": "Subject moved while bleeding."
          }
        ],
        "timelineEvents": [
          "The door opens.",
          "Victim is shoved backward.",
          "Impact occurs near the floor.",
          "Shooter flees, leaving a trail into the bedroom.",
          "Something is missing from the room—was it taken or staged?"
        ],
        "deductionQuestions": [
          {
            "question": "What type of weapon was likely used?",
            "options": ["Blunt", "Sharp", "Projectile"],
            "correctAnswer": "Blunt"
          },
          {
            "question": "Is there evidence of scene tampering?",
            "options": ["Yes", "No"],
            "correctAnswer": "Yes"
          }
        ]
      }
    ]
    ```

## 3. Styling Approach

The visual design will adhere to a "hyperrealistic, black-and-white with deep red for blood" aesthetic.

*   **Global Styles (`app/globals.css`)**:
    *   Base typography and color palette (grayscale, deep red for accents).
    *   Overall background and foundational styles.

*   **CSS Modules (`.module.css`)**:
    *   Component-specific styling for `RadialTool`, `FeedbackDisplay`, `ResultDisplay`, etc.
    *   Ensures scoped styles and avoids conflicts.

## 4. Component Flow and State Transitions (Mermaid Diagram)

```mermaid
graph TD
    A[App/page.tsx] --> B{currentPhase};

    B -- PatternRecognition --> C[PatternRecognitionPhase];
    C --> C1[CrimeSceneDisplay];
    C --> C2[RadialTool];
    C1 -- Click Hotspot --> C;
    C2 -- Select Pattern --> C;
    C -- Correct/Incorrect --> C3[FeedbackDisplay];
    C -- All Patterns Identified --> B;

    B -- TimelineReconstruction --> D[TimelineReconstructionPhase];
    D -- Events Reconstructed --> B;

    B -- Deduction --> E[DeductionPhase];
    E -- Answer Questions --> B;

    B -- Result --> F[ResultDisplay];

    style A fill:#f9f,stroke:#333,stroke-width:2px;
    style B fill:#ccf,stroke:#333,stroke-width:2px;
    style C fill:#bbf,stroke:#333,stroke-width:2px;
    style D fill:#bbf,stroke:#333,stroke-width:2px;
    style E fill:#bbf,stroke:#333,stroke-width:2px;
    style F fill:#f9f,stroke:#333,stroke-width:2px;
    style C1 fill:#ddf,stroke:#333,stroke-width:1px;
    style C2 fill:#ddf,stroke:#333,stroke-width:1px;
    style C3 fill:#ddf,stroke:#333,stroke-width:1px;