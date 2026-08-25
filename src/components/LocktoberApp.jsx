import React, { useState, useEffect } from 'react';
import { Sparkles, Lock, Flame, Heart, RefreshCw, CheckSquare, Square, Moon, Droplet } from 'lucide-react';

const initialSchedule = [
  // WEEK 1
  { date: "Oct 1", day: "Wed", week: 1, pleasure: "15-minute oral warming session to start the month.", periodPleasure: "Breast & Nipple Worship: 20+ min massage & nipple play.", frustration: "Cage on after shower. No touching. First check-in photo.", role: "Holds key. Sets 1 house sexual rule for October.", pts: 10, done: false },
  { date: "Oct 2", day: "Thu", week: 1, pleasure: "You use her favorite wand/vibrator on her until she climaxes.", periodPleasure: "External Wand Focus: Guide external toy over panties/towel.", frustration: "Edge once caged (hands on cage only, 10 min max). Report closeness.", role: "Approves/denies edge. Over time = -15 pts.", pts: 10, done: false },
  { date: "Oct 3", day: "Fri", week: 1, pleasure: "Naked breast and body worship session in bed.", periodPleasure: "Sensory Tease: Neck, chest & shoulder warm oil worship.", frustration: "Cage to work. Mid-day check photo. Send 3 dirty texts about her body.", role: "Sends teasing photos while you're locked up.", pts: 10, done: false },
  { date: "Oct 4", day: "Sat", week: 1, pleasure: "30-minute edging session for her using your hands and tongue.", periodPleasure: "Upper-Body Massage & Tease: 30-min back & breast massage.", frustration: "Perform naked chores caged while she watches and gets turned on.", role: "Rates performance. Poor = extra denial day.", pts: 10, done: false },
  { date: "Oct 5", day: "Sun", week: 1, pleasure: "Extended oral session—must bring her to 2 full orgasms.", periodPleasure: "External Multi-Climax: Use suction toy over clothes/towel.", frustration: "Edge twice caged. She holds a vibrator against your cage during climax.", role: "Controls vibrator and sets the pace.", pts: 10, done: false },
  { date: "Oct 6", day: "Mon", week: 1, pleasure: "She uses your face as a seat while she enjoys her toy.", periodPleasure: "Verbal Command Focus: She directs your caged tasks while relaxing.", frustration: "No edging. Cage check photos every 2 hours.", role: "Random inspections. Miss one = lose next edge.", pts: 10, done: false },
  { date: "Oct 7", day: "Tue", week: 1, pleasure: "She gets a guaranteed climax before any dice are rolled.", periodPleasure: "Warm Bath & Upper Worship before dice roll.", frustration: "Release Lottery (Use Lottery Roller below).", role: "Executes lottery roll. Clean up with tongue if release.", pts: 10, done: false },

  // WEEK 2
  { date: "Oct 8", day: "Wed", week: 2, pleasure: "Sensual oil massage ending in a toy-assisted orgasm for her.", periodPleasure: "Erotic Upper-Body Massage with warm oils.", frustration: "She picks your underwear (or none). Photo proof required.", role: "Sends teasing photo of her underwear.", pts: 10, done: false },
  { date: "Oct 9", day: "Thu", week: 2, pleasure: "20 minutes of rimming / localized oral focus for her.", periodPleasure: "20-min back & inner-thigh massage (avoiding sensitive areas).", frustration: "Edge with plug/perineum pressure caged. Write focus log.", role: "Sets mantra: 'My body is for her pleasure.'", pts: 10, done: false },
  { date: "Oct 10", day: "Fri", week: 2, pleasure: "Feminization Friday: Serve her naked/lingerie while she uses a suction toy.", periodPleasure: "Feminization Friday: Serve her while she uses external wand.", frustration: "Painted toenails, cage visible.", role: "Picks color. Praises or mocks your caged state.", pts: 10, done: false },
  { date: "Oct 11", day: "Sat", week: 2, pleasure: "Read aloud a dirty erotica scene while bringing her to the brink.", periodPleasure: "Erotica Reading + Breast & Nipple Tease to the brink.", frustration: "No touch. Write a paragraph detailing sexual desperation.", role: "Listens while you kneel at her feet.", pts: 10, done: false },
  { date: "Oct 12", day: "Sun", week: 2, pleasure: "Multi-climax Sunday: Her choice of toys, oral, or manual play.", periodPleasure: "Multi-climax Sunday: External wand & suction toys only.", frustration: "Edge 3x, 4 hrs apart. Desperation report (1-10).", role: "Any report < 8 = edge again until it hits 8.", pts: 10, done: false },
  { date: "Oct 13", day: "Mon", week: 2, pleasure: "Oral worship until she's completely spent.", periodPleasure: "Full-body touch marathon (upper body focus) until spent.", frustration: "Plug 30 min caged. Edge after, cage back on immediately.", role: "Supervises or sets timer.", pts: 10, done: false },
  { date: "Oct 14", day: "Tue", week: 2, pleasure: "Full sexual service (oral + toys) before rolling.", periodPleasure: "External toy service before rolling.", frustration: "Release Lottery (Use Lottery Roller below).", role: "Executes lottery. Re-roll costs 100 pts.", pts: 10, done: false },

  // WEEK 3
  { date: "Oct 15", day: "Wed", week: 3, pleasure: "Send 3 explicit texts detailing how you plan to make her climax.", periodPleasure: "Send 3 explicit texts detailing upper-body/toy plans.", frustration: "Every sexual thought = 1 detail messaged to her (Min 3).", role: "Responds with encouragement or severe denial.", pts: 10, done: false },
  { date: "Oct 16", day: "Thu", week: 3, pleasure: "Blindfold her and use 3 different sensations/toys on her body.", periodPleasure: "Blindfold her: Ice, warm oil, & external toy sensations.", frustration: "Edge while kneeling, worn underwear over face. Describe smell.", role: "Provides underwear. Judges description & posture.", pts: 10, done: false },
  { date: "Oct 17", day: "Fri", week: 3, pleasure: "Total focus on erogenous zones (thighs, neck, chest).", periodPleasure: "Total focus on erogenous zones (thighs, neck, chest).", frustration: "No phone except work. Cage check photos at random texts.", role: "Unpredictable intervals. Miss = +2 days locked.", pts: 10, done: false },
  { date: "Oct 18", day: "Sat", week: 3, pleasure: "She rides your face until she hits a massive climax.", periodPleasure: "External wand marathon while she rests on your chest.", frustration: "Feminization Friday: Makeup, cage visible.", role: "Picks look. Saves picture as phone wallpaper.", pts: 10, done: false },
  { date: "Oct 19", day: "Sun", week: 3, pleasure: "Toy & oral marathon—aiming for 3+ orgasms for her.", periodPleasure: "External Toy Marathon—aiming for 3+ climaxes for her.", frustration: "Plug 1 hr caged. Edge after. Anal orgasm allowed if able.", role: "Observes / demands video. Decides if earned.", pts: 10, done: false },
  { date: "Oct 20", day: "Mon", week: 3, pleasure: "Write 5 explicit sexual acts you want to perform on her.", periodPleasure: "Write 5 explicit period-friendly pleasure acts for her.", frustration: "No touch. She picks 1 written task to perform caged & desperate.", role: "Selects task and demands execution.", pts: 10, done: false },
  { date: "Oct 21", day: "Tue", week: 3, pleasure: "She enjoys a hands-free night while you do all physical work.", periodPleasure: "She enjoys a hands-free night (external toys only).", frustration: "Release Lottery (Use Lottery Roller below).", role: "Executes lottery.", pts: 10, done: false },

  // WEEK 4
  { date: "Oct 22", day: "Wed", week: 4, pleasure: "Prolonged 30-min oral & toy session focused on G-spot/clit.", periodPleasure: "Prolonged 30-min nipple & external wand session.", frustration: "48-hr Edging Blackout (Part 1). Double point day.", role: "Sends explicit nude/tease photos you cannot act on.", pts: 20, done: false },
  { date: "Oct 23", day: "Thu", week: 4, pleasure: "She uses a toy on you, or uses you as a footrest while self-pleasuring.", periodPleasure: "She uses you as a footrest while using an external vibrator.", frustration: "Blackout (Part 2). Kneel 5 min, 3 times today caged.", role: "Randomly demands proof photo of kneeling.", pts: 20, done: false },
  { date: "Oct 24", day: "Fri", week: 4, pleasure: "Serve her sexually while wearing pantyhose/lingerie.", periodPleasure: "Serve her sexually (upper body focus) in lingerie.", frustration: "Feminization Friday: Panties & camisole.", role: "Dresses you. Takes photos. Enjoys frustration.", pts: 10, done: false },
  { date: "Oct 25", day: "Sat", week: 4, pleasure: "She uses your hands, mouth, & toys for multiple orgasms.", periodPleasure: "She uses your hands & external toys for multiple orgasms.", frustration: "Edge once, she picks method (hand on cage/vib/pillow), 15 min.", role: "Picks method. Watches or demands video.", pts: 10, done: false },
  { date: "Oct 26", day: "Sun", week: 4, pleasure: "Deep oral session until she explicitly commands stop.", periodPleasure: "Deep breast & neck worship until she commands stop.", frustration: "Plug 2 hours caged. Edge after. Beg for toy use while caged.", role: "Judges begging quality; decides if granted.", pts: 10, done: false },
  { date: "Oct 27", day: "Mon", week: 4, pleasure: "Write erotic fantasy on her ultimate sexual power over you.", periodPleasure: "Write erotic fantasy on her ultimate sexual power over you.", frustration: "Read fantasy aloud while kneeling at her feet, caged.", role: "Listens, then responds with her own verdict.", pts: 10, done: false },
  { date: "Oct 28", day: "Tue", week: 4, pleasure: "Intensive oral/clitoral worship prior to rolling.", periodPleasure: "Intensive upper-body worship prior to rolling.", frustration: "Final Lottery (Use Lottery Roller below).", role: "Executes main lottery.", pts: 10, done: false },
  { date: "Oct 29", day: "Wed", week: 4, pleasure: "Write detailed 'November Erotic Wishlist' for her pleasure.", periodPleasure: "Write detailed 'November Erotic Wishlist' for her pleasure.", frustration: "If locked: Edge twice. Submit wishlist for review.", role: "Reviews fantasy; retains total control.", pts: 10, done: false },
  { date: "Oct 30", day: "Thu", week: 4, pleasure: "Ultimate pleasure session: Warm bath, toys, oral, total focus.", periodPleasure: "Ultimate pleasure session: Warm bath, oil massage, wand.", frustration: "If locked: Plug + cage, 1 hour. Beg for Halloween release.", role: "Evaluates point balance (>300 pts = +1 bonus roll).", pts: 10, done: false },
  { date: "Oct 31", day: "Fri", week: 4, pleasure: "HALLOWEEN: Total sexual submission—she uses you as desired.", periodPleasure: "HALLOWEEN: Total sexual submission—upper body & toys.", frustration: "Her Choice: Key release, caged release, or extend lock.", role: "Final decision and reward execution.", pts: 20, done: false }
];

const lotteryOutcomes = [
  "1: Ruined Orgasm (Keyholder decides cleanup)",
  "2: Ruined Orgasm (Keyholder decides cleanup)",
  "3: Vibrator-Caged Orgasm",
  "4: Full Unlocked Orgasm (Thank her oral service 2x)",
  "5: No Release — Extra Edge Session Required",
  "6: No Release — Locked for additional 24 hours"
];

export default function LocktoberApp() {
  const [schedule, setSchedule] = useState(initialSchedule);
  const [periodMode, setPeriodMode] = useState(false);
  const [diceResult, setDiceResult] = useState(null);
  const [isRolling, setIsRolling] = useState(false);

  // Calculate totals
  const totalEarned = schedule.reduce((acc, curr) => curr.done ? acc + curr.pts : acc, 0);
  const totalPossible = schedule.reduce((acc, curr) => acc + curr.pts, 0);
  const progressPercent = Math.round((totalEarned / totalPossible) * 100);

  const toggleTask = (index) => {
    const updated = [...schedule];
    updated[index].done = !updated[index].done;
    setSchedule(updated);
  };

  const rollDice = () => {
    setIsRolling(true);
    setDiceResult(null);
    setTimeout(() => {
      const roll = Math.floor(Math.random() * 6);
      setDiceResult({ roll: roll + 1, text: lotteryOutcomes[roll] });
      setIsRolling(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans pb-12">
      {/* Top Navigation / Branding */}
      <header className="border-b border-purple-900/40 bg-slate-900/80 backdrop-blur sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-tr from-purple-600 to-pink-600 rounded-lg shadow-lg">
              <Lock className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-wider text-pink-400 uppercase">Locktober Control</h1>
              <p className="text-xs text-purple-300">Her Pleasure & Your Frustration Dashboard</p>
            </div>
          </div>

          {/* Period Mode Toggle */}
          <div className="flex items-center space-x-3 bg-slate-800/80 border border-slate-700 px-4 py-2 rounded-full">
            <Droplet className={`w-4 h-4 ${periodMode ? 'text-red-500 fill-red-500 animate-pulse' : 'text-slate-400'}`} />
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">Aunt Flo Mode</span>
            <button
              onClick={() => setPeriodMode(!periodMode)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${periodMode ? 'bg-red-600' : 'bg-slate-700'}`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${periodMode ? 'translate-x-6' : 'translate-x-1'}`} />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 mt-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Left Sidebar: Dashboard Stats & Lottery */}
        <div className="lg:col-span-1 space-y-6">
          
          {/* Progress Card */}
          <div className="bg-slate-900 border border-purple-900/30 rounded-xl p-5 shadow-xl">
            <h2 className="text-sm font-bold uppercase tracking-wider text-purple-400 mb-4 flex items-center">
              <Flame className="w-4 h-4 mr-2 text-pink-500" /> October Progress
            </h2>
            
            <div className="text-center my-4">
              <div className="text-4xl font-black text-pink-500">{totalEarned}</div>
              <div className="text-xs text-slate-400 uppercase tracking-widest mt-1">/ {totalPossible} Total Points</div>
            </div>

            <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden border border-slate-700">
              <div 
                className="bg-gradient-to-r from-purple-600 to-pink-500 h-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
            <div className="text-right text-xs text-purple-300 font-bold mt-2">{progressPercent}% Completed</div>
          </div>

          {/* Release Lottery Dice Roller */}
          <div className="bg-slate-900 border border-pink-900/30 rounded-xl p-5 shadow-xl">
            <h2 className="text-sm font-bold uppercase tracking-wider text-pink-400 mb-3 flex items-center">
              <Sparkles className="w-4 h-4 mr-2 text-purple-400" /> Release Lottery Roller
            </h2>
            <p className="text-xs text-slate-400 mb-4">Execute on Tuesday lottery days. Wifey rolls the dice.</p>
            
            <button
              onClick={rollDice}
              disabled={isRolling}
              className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold rounded-lg shadow-md transition-all flex justify-center items-center space-x-2 disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${isRolling ? 'animate-spin' : ''}`} />
              <span>{isRolling ? "Rolling..." : "Roll Release Dice"}</span>
            </button>

            {diceResult && (
              <div className="mt-4 p-3 bg-purple-950/60 border border-purple-500/30 rounded-lg text-center animate-fade-in">
                <div className="text-xs text-purple-300 uppercase tracking-widest font-semibold">Result (Roll #{diceResult.roll})</div>
                <div className="text-sm font-bold text-pink-300 mt-1">{diceResult.text}</div>
              </div>
            )}
          </div>

          {/* Period Mode Alert */}
          {periodMode && (
            <div className="bg-red-950/40 border border-red-800/40 rounded-xl p-4 text-xs text-red-200">
              <div className="font-bold uppercase tracking-wider text-red-400 mb-1 flex items-center">
                <Droplet className="w-3.5 h-3.5 mr-1 fill-red-400" /> Period Protocol Active
              </div>
              All daily tasks automatically shifted to upper-body & non-penetrative pleasure focus. +5 bonus pts for warm tea/heat pad preparation.
            </div>
          )}
        </div>

        {/* Right Content: Calendar Schedule */}
        <div className="lg:col-span-3 space-y-4">
          
          {[1, 2, 3, 4].map(weekNum => (
            <div key={weekNum} className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
              <div className="bg-slate-800/80 px-4 py-3 border-b border-slate-700 flex justify-between items-center">
                <h3 className="text-xs font-bold uppercase tracking-wider text-purple-300">
                  Week {weekNum}: {weekNum === 1 ? 'Conditioning & Devotion' : weekNum === 2 ? 'Deepening Seduction' : weekNum === 3 ? 'Intense Erotic Servitude' : 'Peak Frustration & Finale'}
                </h3>
              </div>

              <div className="divide-y divide-slate-800/60">
                {schedule.filter(item => item.week === weekNum).map((item, idx) => {
                  const globalIdx = schedule.findIndex(s => s.date === item.date);
                  return (
                    <div 
                      key={item.date}
                      onClick={() => toggleTask(globalIdx)}
                      className={`p-4 transition-colors cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${item.done ? 'bg-purple-950/20' : 'hover:bg-slate-800/30'}`}
                    >
                      <div className="flex items-start space-x-3 flex-1">
                        <button className="mt-1 text-purple-400 hover:text-pink-400 transition-colors">
                          {item.done ? <CheckSquare className="w-5 h-5 text-pink-500" /> : <Square className="w-5 h-5 text-slate-600" />}
                        </button>
                        
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="text-xs font-bold text-pink-400">{item.date} ({item.day})</span>
                            <span className="text-[10px] bg-slate-800 border border-slate-700 px-2 py-0.5 rounded text-amber-400 font-mono font-bold">+{item.pts} PTS</span>
                          </div>
                          
                          {/* Her Pleasure */}
                          <p className="text-xs text-slate-200 mt-1">
                            <strong className="text-pink-300">Her Pleasure:</strong> {periodMode ? item.periodPleasure : item.pleasure}
                          </p>
                          
                          {/* Your Frustration */}
                          <p className="text-xs text-purple-300/80 mt-0.5">
                            <strong className="text-purple-400">Your Task:</strong> {item.frustration}
                          </p>
                        </div>
                      </div>

                      {/* Keyholder Role */}
                      <div className="text-right sm:w-48 text-[11px] text-slate-400 italic bg-slate-950/50 p-2 rounded border border-slate-800/50">
                        <strong className="text-slate-300 not-italic block text-[10px] uppercase font-bold">Wifey's Role:</strong>
                        {item.role}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

        </div>
      </main>
    </div>
  );
}