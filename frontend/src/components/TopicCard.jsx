import { motion } from 'framer-motion';
import Spotlight from './Spotlight';
import { Code2, Hash } from 'lucide-react';

const TopicCard = ({ topics, languages }) => {
    return (
        <div className="grid md:grid-cols-2 gap-6 h-full">
            {/* Topic Mastery */}
            <Spotlight className="h-full">
                <div className="h-full glass p-6 md:p-8 rounded-3xl border border-white/10 flex flex-col">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-accent-pink/20 rounded-lg">
                            <Hash className="text-accent-pink" size={24} />
                        </div>
                        <h3 className="text-xl font-bold">Topic Mastery</h3>
                    </div>

                    <div className="flex-1 space-y-4">
                        {topics.map((topic, i) => (
                            <div key={topic.tagSlug} className="group">
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="font-medium group-hover:text-accent-pink transition-colors">{topic.tagName}</span>
                                    <span className="text-white/40">{topic.problemsSolved}</span>
                                </div>
                                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        whileInView={{ width: `${(topic.problemsSolved / (topics[0]?.problemsSolved || 1)) * 100}%` }}
                                        transition={{ duration: 1, delay: i * 0.1 }}
                                        className="h-full bg-accent-pink/80 shadow-[0_0_10px_rgba(255,0,224,0.3)]"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </Spotlight>

            {/* Language DNA */}
            <Spotlight className="h-full">
                <div className="h-full glass p-6 md:p-8 rounded-3xl border border-white/10 flex flex-col">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-accent-blue/20 rounded-lg">
                            <Code2 className="text-accent-blue" size={24} />
                        </div>
                        <h3 className="text-xl font-bold">Language DNA</h3>
                    </div>

                    <div className="flex-1 flex flex-col justify-center gap-6">
                        {languages.map((lang, i) => (
                            <div key={lang.languageName} className="relative">
                                <div className="flex items-center justify-between mb-2 z-10 relative">
                                    <span className="text-lg font-black tracking-tight">{lang.languageName}</span>
                                    <span className="text-xs bg-white/10 px-2 py-1 rounded text-white/60">{lang.problemsSolved} sol</span>
                                </div>
                                <motion.div
                                    initial={{ scaleX: 0 }}
                                    whileInView={{ scaleX: 1 }}
                                    transition={{ duration: 1.2, delay: 0.2 + (i * 0.2) }}
                                    className="h-full absolute left-0 top-0 bg-accent-blue/10 rounded-r-full -z-0 origin-left w-full"
                                    style={{ width: `${(lang.problemsSolved / (languages[0]?.problemsSolved || 1)) * 100}%` }}
                                />
                            </div>
                        ))}
                        <div className="mt-4 text-xs text-white/30 italic text-center">
                            "You speak {languages[0]?.languageName} fluently."
                        </div>
                    </div>
                </div>
            </Spotlight>
        </div>
    );
};

export default TopicCard;
