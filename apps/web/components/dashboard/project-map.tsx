"use client";

import Map, { Marker, Popup, NavigationControl, Source, Layer, GeolocateControl, FullscreenControl, ScaleControl, useMap } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import { useState, useCallback, useMemo, useEffect } from "react";
import { cn } from "@sgif/ui";
import { Link } from "@/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
    ArrowRight, 
    Zap, 
    MapPin, 
    Satellite, 
    Map as MapIcon, 
    Box, 
    Moon,
    Sun,
    Layers,
    Target,
    Maximize2,
    Navigation,
    Compass,
    Activity,
    TrendingUp,
    Leaf,
    Wind,
    Atom,
    Droplets,
    Building2
} from "lucide-react";

// Map style configurations - Using free OpenFreeMap and CARTO basemaps (no API key required)
const MAP_STYLES = {
    dark: {
        id: 'dark',
        name: 'Dark',
        icon: Moon,
        url: 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json',
        terrain: false,
    },
    satellite: {
        id: 'satellite',
        name: 'Satellite',
        icon: Satellite,
        // Using ArcGIS World Imagery (free for non-commercial use)
        url: 'https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json',
        terrain: false,
        satelliteOverlay: true,
    },
    terrain: {
        id: 'terrain',
        name: '3D View',
        icon: Box,
        url: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json',
        terrain: true,
    },
    light: {
        id: 'light',
        name: 'Light',
        icon: Sun,
        url: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json',
        terrain: false,
    },
};

// Project locations with enhanced detail
const LOCATIONS = [
    { 
        id: "1", 
        name: "Al Dhafra Solar PV", 
        lat: 24.1, 
        lng: 54.5, 
        type: "Solar", 
        power: "2.1 GW",
        status: "Operational",
        progress: 100,
        carbonOffset: "3.2M tons/yr",
        region: "UAE"
    },
    { 
        id: "2", 
        name: "NEOM Hydrogen Hub", 
        lat: 28.0, 
        lng: 35.0, 
        type: "Hydrogen", 
        power: "500 MW",
        status: "Construction",
        progress: 65,
        carbonOffset: "1.8M tons/yr",
        region: "Saudi Arabia"
    },
    { 
        id: "3", 
        name: "Barakah Nuclear Unit 4", 
        lat: 23.9, 
        lng: 52.3, 
        type: "Nuclear", 
        power: "1.4 GW",
        status: "Commissioning",
        progress: 92,
        carbonOffset: "5.6M tons/yr",
        region: "UAE"
    },
    { 
        id: "4", 
        name: "Oman Green Ammonia", 
        lat: 19.0, 
        lng: 57.5, 
        type: "Ammonia", 
        power: "200 kt/y",
        status: "Development",
        progress: 35,
        carbonOffset: "0.8M tons/yr",
        region: "Oman"
    },
    { 
        id: "5", 
        name: "Ras Ghareb Wind Farm", 
        lat: 28.3, 
        lng: 33.0, 
        type: "Wind", 
        power: "800 MW",
        status: "Operational",
        progress: 100,
        carbonOffset: "1.2M tons/yr",
        region: "Egypt"
    },
    { 
        id: "6", 
        name: "Duqm Solar Complex", 
        lat: 19.5, 
        lng: 57.7, 
        type: "Solar", 
        power: "1.5 GW",
        status: "Construction",
        progress: 45,
        carbonOffset: "2.4M tons/yr",
        region: "Oman"
    },
    { 
        id: "7", 
        name: "Kuwait Clean Energy Zone", 
        lat: 29.3, 
        lng: 47.5, 
        type: "Solar", 
        power: "3.0 GW",
        status: "Planning",
        progress: 15,
        carbonOffset: "4.5M tons/yr",
        region: "Kuwait"
    },
    { 
        id: "8", 
        name: "Qatar H2 Terminal", 
        lat: 25.3, 
        lng: 51.5, 
        type: "Hydrogen", 
        power: "1.2 GW",
        status: "Development",
        progress: 28,
        carbonOffset: "2.1M tons/yr",
        region: "Qatar"
    },
];

// Highlighted regions GeoJSON
const HIGHLIGHT_REGIONS = {
    type: "FeatureCollection" as const,
    features: [
        {
            type: "Feature" as const,
            properties: { name: "GCC Clean Energy Corridor", type: "primary" },
            geometry: {
                type: "Polygon" as const,
                coordinates: [[
                    [48, 22], [56, 22], [56, 30], [48, 30], [48, 22]
                ]]
            }
        },
        {
            type: "Feature" as const,
            properties: { name: "Red Sea Hydrogen Belt", type: "secondary" },
            geometry: {
                type: "Polygon" as const,
                coordinates: [[
                    [32, 26], [40, 26], [40, 30], [32, 30], [32, 26]
                ]]
            }
        },
    ]
};

const TYPE_CONFIG = {
    Solar: { 
        color: "#F59E0B", 
        bgColor: "bg-amber-500", 
        shadowColor: "shadow-amber-500/50",
        gradient: "from-amber-500 to-orange-500",
        icon: Sun 
    },
    Wind: { 
        color: "#3B82F6", 
        bgColor: "bg-blue-500", 
        shadowColor: "shadow-blue-500/50",
        gradient: "from-blue-500 to-cyan-500",
        icon: Wind 
    },
    Nuclear: { 
        color: "#A855F7", 
        bgColor: "bg-purple-500", 
        shadowColor: "shadow-purple-500/50",
        gradient: "from-purple-500 to-pink-500",
        icon: Atom 
    },
    Hydrogen: { 
        color: "#06B6D4", 
        bgColor: "bg-cyan-500", 
        shadowColor: "shadow-cyan-500/50",
        gradient: "from-cyan-500 to-teal-500",
        icon: Droplets 
    },
    Ammonia: { 
        color: "#10B981", 
        bgColor: "bg-emerald-500", 
        shadowColor: "shadow-emerald-500/50",
        gradient: "from-emerald-500 to-green-500",
        icon: Leaf 
    },
};

interface ProjectMapProps {
    className?: string;
    showControls?: boolean;
    interactive?: boolean;
}

export function ProjectMap({ className, showControls = true, interactive = true }: ProjectMapProps) {
    const [popupInfo, setPopupInfo] = useState<typeof LOCATIONS[0] | null>(null);
    const [activeStyle, setActiveStyle] = useState<keyof typeof MAP_STYLES>('dark');
    const [showHighlights, setShowHighlights] = useState(true);
    const [activeFilters, setActiveFilters] = useState<string[]>([]);
    const [hoveredMarker, setHoveredMarker] = useState<string | null>(null);
    const [is3DMode, setIs3DMode] = useState(false);
    const [viewState, setViewState] = useState({
        longitude: 47,
        latitude: 25,
        zoom: 4.5,
        pitch: 0,
        bearing: 0,
    });

    const filteredLocations = useMemo(() => {
        if (activeFilters.length === 0) return LOCATIONS;
        return LOCATIONS.filter(loc => activeFilters.includes(loc.type));
    }, [activeFilters]);

    const toggleFilter = useCallback((type: string) => {
        setActiveFilters(prev => 
            prev.includes(type) 
                ? prev.filter(t => t !== type)
                : [...prev, type]
        );
    }, []);

    const handle3DToggle = useCallback(() => {
        setIs3DMode(prev => {
            const newMode = !prev;
            // If enabling 3D mode and current style doesn't support terrain, switch to terrain style
            if (newMode && !MAP_STYLES[activeStyle].terrain) {
                setActiveStyle('terrain');
            }
            return newMode;
        });
        setViewState(prev => ({
            ...prev,
            pitch: prev.pitch === 0 ? 60 : 0,
            bearing: prev.bearing === 0 ? -20 : 0,
            zoom: prev.pitch === 0 ? Math.max(prev.zoom, 8) : prev.zoom, // Zoom in for better 3D effect
        }));
    }, [activeStyle]);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Operational': return 'text-green-400 bg-green-500/10 border-green-500/30';
            case 'Construction': return 'text-amber-400 bg-amber-500/10 border-amber-500/30';
            case 'Commissioning': return 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30';
            case 'Development': return 'text-blue-400 bg-blue-500/10 border-blue-500/30';
            case 'Planning': return 'text-purple-400 bg-purple-500/10 border-purple-500/30';
            default: return 'text-gray-400 bg-gray-500/10 border-gray-500/30';
        }
    };

    return (
        <div className={cn("h-full w-full rounded-xl overflow-hidden relative group", className)}>
            {/* Futuristic border overlay */}
            <div className="absolute inset-0 pointer-events-none z-20 rounded-xl">
                {/* Animated scan line */}
                <motion.div
                    className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyber-cyan/50 to-transparent"
                    animate={{ top: ['0%', '100%'] }}
                    transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                />
                
                {/* Corner accents with glow */}
                <div className="absolute top-0 left-0 w-12 h-12 border-l-2 border-t-2 border-cyber-cyan/40 rounded-tl-xl">
                    <div className="absolute top-0 left-0 w-2 h-2 bg-cyber-cyan rounded-full animate-pulse" />
                </div>
                <div className="absolute top-0 right-0 w-12 h-12 border-r-2 border-t-2 border-sgif-emerald/40 rounded-tr-xl">
                    <div className="absolute top-0 right-0 w-2 h-2 bg-sgif-emerald rounded-full animate-pulse" />
                </div>
                <div className="absolute bottom-0 left-0 w-12 h-12 border-l-2 border-b-2 border-sgif-emerald/40 rounded-bl-xl">
                    <div className="absolute bottom-0 left-0 w-2 h-2 bg-sgif-emerald rounded-full animate-pulse" />
                </div>
                <div className="absolute bottom-0 right-0 w-12 h-12 border-r-2 border-b-2 border-cyber-cyan/40 rounded-br-xl">
                    <div className="absolute bottom-0 right-0 w-2 h-2 bg-cyber-cyan rounded-full animate-pulse" />
                </div>
                
                {/* Edge glow lines */}
                <div className="absolute top-0 left-12 right-12 h-px bg-gradient-to-r from-cyber-cyan/0 via-cyber-cyan/20 to-sgif-emerald/0" />
                <div className="absolute bottom-0 left-12 right-12 h-px bg-gradient-to-r from-sgif-emerald/0 via-sgif-emerald/20 to-cyber-cyan/0" />
            </div>
            
            <Map
                {...viewState}
                onMove={evt => setViewState(evt.viewState)}
                style={{ width: "100%", height: "100%" }}
                mapStyle={MAP_STYLES[activeStyle].url}
                attributionControl={false}
                maxPitch={85}
            >
                {/* Map Controls */}
                {showControls && (
                    <>
                        <GeolocateControl position="top-left" />
                        <FullscreenControl position="top-left" />
                        <NavigationControl position="top-left" visualizePitch={true} />
                        <ScaleControl position="bottom-right" />
                    </>
                )}

                {/* Highlighted Regions Layer */}
                {showHighlights && (
                    <Source id="highlight-regions" type="geojson" data={HIGHLIGHT_REGIONS}>
                        <Layer
                            id="region-fill"
                            type="fill"
                            paint={{
                                'fill-color': ['match', ['get', 'type'],
                                    'primary', 'rgba(0, 212, 255, 0.08)',
                                    'secondary', 'rgba(16, 185, 129, 0.08)',
                                    'rgba(255, 255, 255, 0.05)'
                                ],
                            }}
                        />
                        <Layer
                            id="region-outline"
                            type="line"
                            paint={{
                                'line-color': ['match', ['get', 'type'],
                                    'primary', 'rgba(0, 212, 255, 0.4)',
                                    'secondary', 'rgba(16, 185, 129, 0.4)',
                                    'rgba(255, 255, 255, 0.2)'
                                ],
                                'line-width': 2,
                                'line-dasharray': [4, 2],
                            }}
                        />
                    </Source>
                )}

                {/* Project Markers */}
                {filteredLocations.map((loc) => {
                    const config = TYPE_CONFIG[loc.type as keyof typeof TYPE_CONFIG];
                    const isHovered = hoveredMarker === loc.id;
                    
                    return (
                        <Marker
                            key={loc.id}
                            longitude={loc.lng}
                            latitude={loc.lat}
                            anchor="center"
                            onClick={(e) => {
                                e.originalEvent.stopPropagation();
                                setPopupInfo(loc);
                            }}
                        >
                            <motion.div 
                                className="relative cursor-pointer"
                                onHoverStart={() => setHoveredMarker(loc.id)}
                                onHoverEnd={() => setHoveredMarker(null)}
                                whileHover={{ scale: 1.2 }}
                            >
                                {/* Outer pulse ring */}
                                <motion.div
                                    className="absolute inset-0 rounded-full"
                                    style={{ backgroundColor: config.color }}
                                    animate={{ 
                                        scale: [1, 2.5, 1],
                                        opacity: [0.4, 0, 0.4]
                                    }}
                                    transition={{ duration: 3, repeat: Infinity }}
                                />
                                
                                {/* Middle pulse ring */}
                                <motion.div
                                    className="absolute inset-0 rounded-full"
                                    style={{ backgroundColor: config.color }}
                                    animate={{ 
                                        scale: [1, 2, 1],
                                        opacity: [0.3, 0, 0.3]
                                    }}
                                    transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                                />
                                
                                {/* Main marker */}
                                <div 
                                    className={cn(
                                        "relative h-5 w-5 rounded-full border-2 border-white shadow-lg transition-all duration-300",
                                        config.bgColor,
                                        config.shadowColor,
                                        isHovered && "ring-4 ring-white/20"
                                    )}
                                    style={{
                                        boxShadow: `0 0 20px ${config.color}80, 0 0 40px ${config.color}40`
                                    }}
                                >
                                    {/* Inner glow */}
                                    <div className="absolute inset-1 rounded-full bg-white/30" />
                                </div>

                                {/* Hover label */}
                                <AnimatePresence>
                                    {isHovered && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10, scale: 0.9 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 10, scale: 0.9 }}
                                            className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap"
                                        >
                                            <div className="px-3 py-1.5 bg-gray-900/95 border border-white/10 rounded-lg backdrop-blur-xl">
                                                <span className="text-xs font-medium text-white">{loc.name}</span>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        </Marker>
                    );
                })}

                {/* Popup */}
                <AnimatePresence>
                    {popupInfo && (
                        <Popup
                            anchor="top"
                            longitude={popupInfo.lng}
                            latitude={popupInfo.lat}
                            onClose={() => setPopupInfo(null)}
                            closeButton={false}
                            className="futuristic-popup"
                            maxWidth="320px"
                        >
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.9, y: -10 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="p-4 min-w-[280px] bg-gray-900/98 border border-white/10 rounded-xl backdrop-blur-xl overflow-hidden relative"
                            >
                                {/* Background gradient */}
                                <div className={cn(
                                    "absolute top-0 left-0 right-0 h-16 opacity-20 bg-gradient-to-br",
                                    TYPE_CONFIG[popupInfo.type as keyof typeof TYPE_CONFIG]?.gradient
                                )} />
                                
                                {/* Content */}
                                <div className="relative">
                                    {/* Header */}
                                    <div className="flex items-start justify-between mb-3">
                                        <div className="flex items-center gap-2">
                                            <div 
                                                className="p-2 rounded-lg"
                                                style={{ backgroundColor: `${TYPE_CONFIG[popupInfo.type as keyof typeof TYPE_CONFIG]?.color}15` }}
                                            >
                                                {(() => {
                                                    const Icon = TYPE_CONFIG[popupInfo.type as keyof typeof TYPE_CONFIG]?.icon || Zap;
                                                    return <Icon className="h-4 w-4" style={{ color: TYPE_CONFIG[popupInfo.type as keyof typeof TYPE_CONFIG]?.color }} />;
                                                })()}
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-sm text-white">{popupInfo.name}</h4>
                                                <p className="text-[10px] text-gray-500">{popupInfo.region}</p>
                                            </div>
                                        </div>
                                        <span className={cn(
                                            "px-2 py-0.5 text-[10px] font-medium rounded-full border",
                                            getStatusColor(popupInfo.status)
                                        )}>
                                            {popupInfo.status}
                                        </span>
                                    </div>

                                    {/* Stats grid */}
                                    <div className="grid grid-cols-2 gap-2 mb-3">
                                        <div className="p-2 rounded-lg bg-white/5 border border-white/5">
                                            <p className="text-[10px] text-gray-500 mb-0.5">Capacity</p>
                                            <p className="text-sm font-mono font-bold text-white flex items-center gap-1">
                                                <Zap className="h-3 w-3 text-sgif-gold" />
                                                {popupInfo.power}
                                            </p>
                                        </div>
                                        <div className="p-2 rounded-lg bg-white/5 border border-white/5">
                                            <p className="text-[10px] text-gray-500 mb-0.5">Carbon Offset</p>
                                            <p className="text-sm font-mono font-bold text-sgif-emerald flex items-center gap-1">
                                                <Leaf className="h-3 w-3" />
                                                {popupInfo.carbonOffset}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Progress bar */}
                                    <div className="mb-3">
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="text-[10px] text-gray-500">Completion</span>
                                            <span className="text-[10px] font-mono text-white">{popupInfo.progress}%</span>
                                        </div>
                                        <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${popupInfo.progress}%` }}
                                                transition={{ duration: 1, ease: "easeOut" }}
                                                className={cn("h-full rounded-full bg-gradient-to-r", TYPE_CONFIG[popupInfo.type as keyof typeof TYPE_CONFIG]?.gradient)}
                                            />
                                        </div>
                                    </div>
                                    
                                    {/* Action */}
                                    <Link 
                                        href={`/app/projects/${popupInfo.id}`} 
                                        className="flex items-center justify-center gap-2 w-full py-2 rounded-lg bg-white/5 border border-white/10 text-xs text-white hover:bg-white/10 hover:border-white/20 transition-all group/link"
                                    >
                                        View Project Details
                                        <ArrowRight className="h-3 w-3 group-hover/link:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </motion.div>
                        </Popup>
                    )}
                </AnimatePresence>
            </Map>

            {/* Map Style Selector */}
            <div className="absolute top-4 right-4 z-10">
                <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="glass-card p-1.5 flex gap-1"
                >
                    {Object.entries(MAP_STYLES).map(([key, style]) => {
                        const Icon = style.icon;
                        const isActive = activeStyle === key;
                        return (
                            <motion.button
                                key={key}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setActiveStyle(key as keyof typeof MAP_STYLES)}
                                className={cn(
                                    "flex items-center gap-1.5 px-3 py-2 text-xs rounded-lg transition-all",
                                    isActive
                                        ? "bg-gradient-to-r from-cyber-cyan/20 to-sgif-emerald/20 text-white border border-cyber-cyan/30"
                                        : "text-gray-500 hover:text-white hover:bg-white/5"
                                )}
                            >
                                <Icon className="h-3.5 w-3.5" />
                                <span className="hidden sm:inline">{style.name}</span>
                            </motion.button>
                        );
                    })}
                </motion.div>
            </div>

            {/* 3D Toggle */}
            <div className="absolute top-16 right-4 z-10">
                <motion.button
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handle3DToggle}
                    className={cn(
                        "glass-card p-2.5 flex items-center gap-2 text-xs transition-all",
                        is3DMode 
                            ? "border-sgif-emerald/30 text-sgif-emerald" 
                            : "text-gray-500 hover:text-white"
                    )}
                >
                    <Box className="h-4 w-4" />
                    <span className="hidden sm:inline">3D View</span>
                </motion.button>
            </div>

            {/* Highlight Toggle */}
            <div className="absolute top-28 right-4 z-10">
                <motion.button
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowHighlights(!showHighlights)}
                    className={cn(
                        "glass-card p-2.5 flex items-center gap-2 text-xs transition-all",
                        showHighlights 
                            ? "border-cyber-cyan/30 text-cyber-cyan" 
                            : "text-gray-500 hover:text-white"
                    )}
                >
                    <Layers className="h-4 w-4" />
                    <span className="hidden sm:inline">Zones</span>
                </motion.button>
            </div>

            {/* Project Type Filter */}
            <div className="absolute bottom-4 right-4 z-10">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass-card p-3"
                >
                    <p className="text-[10px] text-gray-500 mb-2 uppercase tracking-wider">Filter by Type</p>
                    <div className="flex flex-wrap gap-1.5">
                        {Object.entries(TYPE_CONFIG).map(([type, config]) => {
                            const Icon = config.icon;
                            const isActive = activeFilters.length === 0 || activeFilters.includes(type);
                            return (
                                <motion.button
                                    key={type}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => toggleFilter(type)}
                                    className={cn(
                                        "flex items-center gap-1.5 px-2 py-1 text-[10px] rounded-lg border transition-all",
                                        isActive ? "" : "border-white/10 opacity-40"
                                    )}
                                    style={{
                                        borderColor: isActive ? `${config.color}50` : undefined,
                                        backgroundColor: isActive ? `${config.color}10` : 'transparent'
                                    }}
                                >
                                    <Icon className="h-3 w-3" style={{ color: config.color }} />
                                    <span style={{ color: isActive ? config.color : 'gray' }}>{type}</span>
                                </motion.button>
                            );
                        })}
                    </div>
                </motion.div>
            </div>

            {/* Legend */}
            <div className="absolute bottom-4 left-4 z-10">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass-card p-4"
                >
                    <h4 className="text-xs font-semibold text-white mb-3 flex items-center gap-2">
                        <div className="w-1 h-4 bg-gradient-to-b from-cyber-cyan to-sgif-emerald rounded-full" />
                        Asset Legend
                    </h4>
                    <div className="space-y-2">
                        {Object.entries(TYPE_CONFIG).map(([type, config]) => {
                            const count = LOCATIONS.filter(l => l.type === type).length;
                            return (
                                <div key={type} className="flex items-center justify-between gap-4">
                                    <div className="flex items-center gap-2">
                                        <div 
                                            className={cn("w-3 h-3 rounded-full shadow-lg", config.bgColor)}
                                            style={{ boxShadow: `0 0 8px ${config.color}60` }}
                                        />
                                        <span className="text-[11px] text-gray-400">{type}</span>
                                    </div>
                                    <span className="text-[10px] font-mono text-gray-600">{count}</span>
                                </div>
                            );
                        })}
                    </div>
                    
                    {/* Region indicators */}
                    <div className="mt-3 pt-3 border-t border-white/5">
                        <p className="text-[10px] text-gray-600 mb-2">Highlighted Zones</p>
                        <div className="space-y-1.5">
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-0.5 rounded" style={{ background: 'rgba(0,212,255,0.5)', border: '1px dashed rgba(0,212,255,0.5)' }} />
                                <span className="text-[10px] text-gray-500">GCC Energy Corridor</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-0.5 rounded" style={{ background: 'rgba(16,185,129,0.5)', border: '1px dashed rgba(16,185,129,0.5)' }} />
                                <span className="text-[10px] text-gray-500">Red Sea H2 Belt</span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Stats HUD */}
            <div className="absolute top-4 left-16 z-10">
                <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="glass-card p-3 flex items-center gap-4"
                >
                    <div className="flex items-center gap-2">
                        <Activity className="h-4 w-4 text-sgif-emerald" />
                        <div>
                            <p className="text-[10px] text-gray-500">Active Projects</p>
                            <p className="text-sm font-bold font-mono text-white">{LOCATIONS.length}</p>
                        </div>
                    </div>
                    <div className="w-px h-8 bg-white/10" />
                    <div className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-cyber-cyan" />
                        <div>
                            <p className="text-[10px] text-gray-500">Total Capacity</p>
                            <p className="text-sm font-bold font-mono text-white">11.7 GW</p>
                        </div>
                    </div>
                    <div className="w-px h-8 bg-white/10" />
                    <div className="flex items-center gap-2">
                        <Leaf className="h-4 w-4 text-sgif-gold" />
                        <div>
                            <p className="text-[10px] text-gray-500">CO₂ Offset</p>
                            <p className="text-sm font-bold font-mono text-white">21.6M t/yr</p>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Coordinates Display */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10">
                <div className="glass-card px-4 py-2 flex items-center gap-3 font-mono text-[10px]">
                    <span className="text-gray-500">LAT</span>
                    <span className="text-cyber-cyan">{viewState.latitude.toFixed(4)}°</span>
                    <div className="w-px h-3 bg-white/20" />
                    <span className="text-gray-500">LNG</span>
                    <span className="text-sgif-emerald">{viewState.longitude.toFixed(4)}°</span>
                    <div className="w-px h-3 bg-white/20" />
                    <span className="text-gray-500">ZOOM</span>
                    <span className="text-white">{viewState.zoom.toFixed(1)}x</span>
                </div>
            </div>
        </div>
    );
}
