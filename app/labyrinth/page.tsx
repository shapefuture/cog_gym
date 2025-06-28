"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, ArrowRight, ArrowUp, ArrowDown, Target, Brain, Timer, Star, RotateCcw } from "lucide-react"
import Link from "next/link"

interface MazeCell {
  x: number
  y: number
  walls: { top: boolean; right: boolean; bottom: boolean; left: boolean }
  visited: boolean
  isBias: boolean
  biasType?: string
  isExit: boolean
}

export default function Labyrinth() {
  const [maze, setMaze] = useState<MazeCell[][]>([])
  const [playerPos, setPlayerPos] = useState({ x: 0, y: 0 })
  const [biasesFound, setBiasesFound] = useState<string[]>([])
  const [timeElapsed, setTimeElapsed] = useState(0)
  const [gameState, setGameState] = useState<"playing" | "completed" | "paused">("playing")
  const [currentBias, setCurrentBias] = useState<string | null>(null)
  const [score, setScore] = useState(0)

  const mazeSize = 8
  const biasTypes = [
    "Confirmation Bias",
    "Anchoring Bias",
    "Availability Heuristic",
    "Overconfidence",
    "Loss Aversion",
    "Sunk Cost Fallacy",
  ]

  // Generate maze using recursive backtracking
  const generateMaze = () => {
    const newMaze: MazeCell[][] = []

    // Initialize grid
    for (let y = 0; y < mazeSize; y++) {
      newMaze[y] = []
      for (let x = 0; x < mazeSize; x++) {
        newMaze[y][x] = {
          x,
          y,
          walls: { top: true, right: true, bottom: true, left: true },
          visited: false,
          isBias: false,
          isExit: x === mazeSize - 1 && y === mazeSize - 1,
        }
      }
    }

    // Recursive backtracking algorithm
    const stack: { x: number; y: number }[] = []
    const current = { x: 0, y: 0 }
    newMaze[0][0].visited = true

    const getNeighbors = (x: number, y: number) => {
      const neighbors = []
      if (y > 0 && !newMaze[y - 1][x].visited) neighbors.push({ x, y: y - 1, dir: "top" })
      if (x < mazeSize - 1 && !newMaze[y][x + 1].visited) neighbors.push({ x: x + 1, y, dir: "right" })
      if (y < mazeSize - 1 && !newMaze[y + 1][x].visited) neighbors.push({ x, y: y + 1, dir: "bottom" })
      if (x > 0 && !newMaze[y][x - 1].visited) neighbors.push({ x: x - 1, y, dir: "left" })
      return neighbors
    }

    const removeWall = (current: { x: number; y: number }, next: { x: number; y: number; dir: string }) => {
      if (next.dir === "top") {
        newMaze[current.y][current.x].walls.top = false
        newMaze[next.y][next.x].walls.bottom = false
      } else if (next.dir === "right") {
        newMaze[current.y][current.x].walls.right = false
        newMaze[next.y][next.x].walls.left = false
      } else if (next.dir === "bottom") {
        newMaze[current.y][current.x].walls.bottom = false
        newMaze[next.y][next.x].walls.top = false
      } else if (next.dir === "left") {
        newMaze[current.y][current.x].walls.left = false
        newMaze[next.y][next.x].walls.right = false
      }
    }

    while (true) {
      const neighbors = getNeighbors(current.x, current.y)

      if (neighbors.length > 0) {
        const next = neighbors[Math.floor(Math.random() * neighbors.length)]
        removeWall(current, next)
        newMaze[next.y][next.x].visited = true
        stack.push({ x: current.x, y: current.y })
        current.x = next.x
        current.y = next.y
      } else if (stack.length > 0) {
        const prev = stack.pop()!
        current.x = prev.x
        current.y = prev.y
      } else {
        break
      }
    }

    // Place biases randomly
    const biasPositions = new Set<string>()
    while (biasPositions.size < biasTypes.length) {
      const x = Math.floor(Math.random() * mazeSize)
      const y = Math.floor(Math.random() * mazeSize)
      const key = `${x},${y}`

      if (!biasPositions.has(key) && !(x === 0 && y === 0) && !(x === mazeSize - 1 && y === mazeSize - 1)) {
        biasPositions.add(key)
        newMaze[y][x].isBias = true
        newMaze[y][x].biasType = biasTypes[biasPositions.size - 1]
      }
    }

    setMaze(newMaze)
  }

  useEffect(() => {
    generateMaze()
  }, [])

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (gameState === "playing") {
      interval = setInterval(() => {
        setTimeElapsed((prev) => prev + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [gameState])

  const movePlayer = (direction: "up" | "down" | "left" | "right") => {
    if (gameState !== "playing") return

    const { x, y } = playerPos
    const currentCell = maze[y]?.[x]
    if (!currentCell) return

    let newX = x
    let newY = y
    let canMove = false

    switch (direction) {
      case "up":
        if (!currentCell.walls.top && y > 0) {
          newY = y - 1
          canMove = true
        }
        break
      case "down":
        if (!currentCell.walls.bottom && y < mazeSize - 1) {
          newY = y + 1
          canMove = true
        }
        break
      case "left":
        if (!currentCell.walls.left && x > 0) {
          newX = x - 1
          canMove = true
        }
        break
      case "right":
        if (!currentCell.walls.right && x < mazeSize - 1) {
          newX = x + 1
          canMove = true
        }
        break
    }

    if (canMove) {
      setPlayerPos({ x: newX, y: newY })

      const newCell = maze[newY][newX]

      // Check for bias
      if (newCell.isBias && newCell.biasType && !biasesFound.includes(newCell.biasType)) {
        setBiasesFound((prev) => [...prev, newCell.biasType!])
        setCurrentBias(newCell.biasType)
        setScore((prev) => prev + 100)
        setTimeout(() => setCurrentBias(null), 3000)
      }

      // Check for exit
      if (newCell.isExit) {
        setGameState("completed")
        setScore((prev) => prev + Math.max(0, 1000 - timeElapsed * 10))
      }
    }
  }

  const handleKeyPress = (e: KeyboardEvent) => {
    switch (e.key) {
      case "ArrowUp":
      case "w":
      case "W":
        e.preventDefault()
        movePlayer("up")
        break
      case "ArrowDown":
      case "s":
      case "S":
        e.preventDefault()
        movePlayer("down")
        break
      case "ArrowLeft":
      case "a":
      case "A":
        e.preventDefault()
        movePlayer("left")
        break
      case "ArrowRight":
      case "d":
      case "D":
        e.preventDefault()
        movePlayer("right")
        break
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [playerPos, gameState, maze])

  const resetGame = () => {
    setPlayerPos({ x: 0, y: 0 })
    setBiasesFound([])
    setTimeElapsed(0)
    setGameState("playing")
    setCurrentBias(null)
    setScore(0)
    generateMaze()
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-neutral-800/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/dashboard" className="text-white/60 hover:text-white transition-colors">
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div>
                <h1 className="text-lg font-medium">Cognitive Labyrinth</h1>
                <p className="text-sm text-white/60">Navigate through biases to reach cognitive clarity</p>
              </div>
            </div>

            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-2">
                  <Timer className="w-4 h-4 text-blue-400" />
                  <span>{formatTime(timeElapsed)}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Target className="w-4 h-4 text-green-400" />
                  <span>
                    {biasesFound.length}/{biasTypes.length}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className="w-4 h-4 text-yellow-400" />
                  <span>{score}</span>
                </div>
              </div>

              <button
                onClick={resetGame}
                className="flex items-center space-x-2 bg-white/10 border border-white/20 text-white px-4 py-2 rounded-lg hover:bg-white/20 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reset</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Maze */}
          <div className="lg:col-span-3">
            <div className="bg-neutral-900/40 border border-neutral-800/50 rounded-2xl p-8 backdrop-blur-sm">
              <div className="aspect-square max-w-2xl mx-auto">
                <div className="grid grid-cols-8 gap-0 h-full border-2 border-neutral-600 rounded-lg overflow-hidden">
                  {maze.map((row, y) =>
                    row.map((cell, x) => (
                      <motion.div
                        key={`${x}-${y}`}
                        className={`relative border-neutral-600 ${
                          cell.walls.top ? "border-t-2" : ""
                        } ${cell.walls.right ? "border-r-2" : ""} ${
                          cell.walls.bottom ? "border-b-2" : ""
                        } ${cell.walls.left ? "border-l-2" : ""} ${
                          cell.isExit ? "bg-green-500/20" : cell.isBias ? "bg-red-500/20" : "bg-neutral-800/30"
                        }`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.1, delay: (x + y) * 0.01 }}
                      >
                        {/* Player */}
                        {playerPos.x === x && playerPos.y === y && (
                          <motion.div
                            className="absolute inset-1 bg-blue-500 rounded-full flex items-center justify-center"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                          >
                            <Brain className="w-3 h-3 text-white" />
                          </motion.div>
                        )}

                        {/* Bias indicator */}
                        {cell.isBias && !biasesFound.includes(cell.biasType!) && (
                          <motion.div
                            className="absolute inset-2 bg-red-500 rounded-full"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                          />
                        )}

                        {/* Found bias */}
                        {cell.isBias && biasesFound.includes(cell.biasType!) && (
                          <div className="absolute inset-2 bg-green-500/50 rounded-full flex items-center justify-center">
                            <Target className="w-2 h-2 text-white" />
                          </div>
                        )}

                        {/* Exit indicator */}
                        {cell.isExit && (
                          <motion.div
                            className="absolute inset-1 bg-green-500 rounded flex items-center justify-center"
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                          >
                            <Star className="w-3 h-3 text-white" />
                          </motion.div>
                        )}
                      </motion.div>
                    )),
                  )}
                </div>
              </div>

              {/* Controls */}
              <div className="mt-8 text-center">
                <p className="text-white/60 mb-4">Use arrow keys or WASD to navigate</p>
                <div className="grid grid-cols-3 gap-2 max-w-32 mx-auto">
                  <div></div>
                  <button
                    onClick={() => movePlayer("up")}
                    className="bg-neutral-700 hover:bg-neutral-600 p-2 rounded transition-colors"
                  >
                    <ArrowUp className="w-4 h-4" />
                  </button>
                  <div></div>
                  <button
                    onClick={() => movePlayer("left")}
                    className="bg-neutral-700 hover:bg-neutral-600 p-2 rounded transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => movePlayer("down")}
                    className="bg-neutral-700 hover:bg-neutral-600 p-2 rounded transition-colors"
                  >
                    <ArrowDown className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => movePlayer("right")}
                    className="bg-neutral-700 hover:bg-neutral-600 p-2 rounded transition-colors"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Current Bias Alert */}
            <AnimatePresence>
              {currentBias && (
                <motion.div
                  className="bg-red-500/20 border border-red-500/50 rounded-xl p-4"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                >
                  <div className="flex items-center space-x-2 mb-2">
                    <Target className="w-5 h-5 text-red-400" />
                    <span className="font-semibold text-red-100">Bias Found!</span>
                  </div>
                  <p className="text-red-200 text-sm">{currentBias}</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Progress */}
            <div className="bg-neutral-900/40 border border-neutral-800/50 rounded-xl p-6 backdrop-blur-sm">
              <h3 className="font-semibold mb-4">Progress</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Biases Found</span>
                    <span>
                      {biasesFound.length}/{biasTypes.length}
                    </span>
                  </div>
                  <div className="w-full bg-neutral-700 rounded-full h-2">
                    <motion.div
                      className="bg-green-500 h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${(biasesFound.length / biasTypes.length) * 100}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>

                <div className="text-sm text-white/60">
                  <p>Time: {formatTime(timeElapsed)}</p>
                  <p>Score: {score}</p>
                </div>
              </div>
            </div>

            {/* Bias Checklist */}
            <div className="bg-neutral-900/40 border border-neutral-800/50 rounded-xl p-6 backdrop-blur-sm">
              <h3 className="font-semibold mb-4">Cognitive Biases</h3>
              <div className="space-y-2">
                {biasTypes.map((bias) => (
                  <div
                    key={bias}
                    className={`flex items-center space-x-2 text-sm ${
                      biasesFound.includes(bias) ? "text-green-400" : "text-white/60"
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                        biasesFound.includes(bias) ? "border-green-400 bg-green-400" : "border-white/30"
                      }`}
                    >
                      {biasesFound.includes(bias) && <Target className="w-2 h-2 text-black" />}
                    </div>
                    <span>{bias}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Instructions */}
            <div className="bg-neutral-900/40 border border-neutral-800/50 rounded-xl p-6 backdrop-blur-sm">
              <h3 className="font-semibold mb-4">How to Play</h3>
              <div className="space-y-2 text-sm text-white/70">
                <p>• Navigate through the maze using arrow keys</p>
                <p>• Find all cognitive biases (red dots)</p>
                <p>• Reach the exit (green star) to complete</p>
                <p>• Faster completion = higher score</p>
              </div>
            </div>
          </div>
        </div>

        {/* Completion Modal */}
        <AnimatePresence>
          {gameState === "completed" && (
            <motion.div
              className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-neutral-900 border border-neutral-700 rounded-2xl p-8 max-w-md w-full mx-4"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
              >
                <div className="text-center">
                  <motion.div
                    className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Star className="w-8 h-8 text-white" />
                  </motion.div>

                  <h2 className="text-2xl font-semibold mb-4">Labyrinth Complete!</h2>

                  <div className="space-y-2 mb-6">
                    <p className="text-white/70">Time: {formatTime(timeElapsed)}</p>
                    <p className="text-white/70">
                      Biases Found: {biasesFound.length}/{biasTypes.length}
                    </p>
                    <p className="text-2xl font-light">Final Score: {score}</p>
                  </div>

                  <div className="flex space-x-4">
                    <button
                      onClick={resetGame}
                      className="flex-1 bg-white text-black py-3 rounded-xl font-semibold hover:bg-white/90 transition-colors"
                    >
                      Play Again
                    </button>
                    <Link
                      href="/dashboard"
                      className="flex-1 border border-white/20 text-white py-3 rounded-xl font-semibold hover:bg-white/5 transition-colors text-center"
                    >
                      Dashboard
                    </Link>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  )
}
