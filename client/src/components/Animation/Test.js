import * as THREE from 'three';
import React, { useRef, useMemo } from 'react';
import { Canvas, extend, useFrame, useThree } from '@react-three/fiber';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { AfterimagePass } from 'three/examples/jsm/postprocessing/AfterimagePass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';


extend({ EffectComposer, ShaderPass, RenderPass, AfterimagePass, UnrealBloomPass })

function Swarm({ count }) {
  const mesh = useRef()
  const light = useRef()
  const { viewport, mouse } = useThree()

  const dummy = useMemo(() => new THREE.Object3D(), [])
  const particles = useMemo(() => {
    const temp = []
    for (let i = 0; i < count; i++) {
      const t = Math.random() * 100
      const factor = 20 + Math.random() * 100
      const speed = (0.01 + Math.random() / 200)/3
      const xFactor = -50 + Math.random() * 100
      const yFactor = -50 + Math.random() * 100
      const zFactor = -50 + Math.random() * 100
      temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 })
    }
    return temp
  }, [count])

  useFrame((state) => {
    particles.forEach((particle, i) => {
      let { t, factor, speed, xFactor, yFactor, zFactor } = particle
      t = particle.t += speed / 2
      const a = Math.cos(t) + Math.sin(t * 1) / 10
      const b = Math.sin(t) + Math.cos(t * 2) / 10
      const s = Math.cos(t)
      particle.mx += mouse.x * viewport.width * particle.mx * 0.01
      particle.my += mouse.y * viewport.height * particle.my * 0.01
      dummy.position.set(
        (particle.mx / 10) * a + xFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
        (particle.my / 10) * b + yFactor + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
        (particle.my / 10) * b + zFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10
      )
      dummy.scale.set(s, s, s)
      dummy.rotation.set(s * 5, s * 5, s * 5)
      dummy.updateMatrix()
      mesh.current.setMatrixAt(i, dummy.matrix)
    })
    mesh.current.instanceMatrix.needsUpdate = true
  })
  return (
    <>
      <pointLight ref={light} distance={100} intensity={0.8} color="#ff2626" />
      <instancedMesh ref={mesh} args={[null, null, count]}>
        <tetrahedronBufferGeometry args={[1, 0]} />
        <meshStandardMaterial color="white" />
      </instancedMesh>
    </>
  )
}

function Dolly() {
  useFrame(({ clock, camera }) => {
    camera.position.z = 50 - Math.sin(clock.getElapsedTime()*0.3) * 30 * Math.sin(clock.getElapsedTime()*0.3)
  })
  return null
}

const Home = () => {
  return (
      <div style={{
        position: 'fixed', 
        top: 0, 
        right: 0, 
        bottom:  0, 
        left: 0,
        backgroundColor: 'black'
      }}>
            <Canvas camera={{ fov: 75, position: [0, 0, 70], zoom: 2 }}>
            <spotLight position={[100,-100,100]} angle={1} color="#345f65"/>
            <spotLight position={[-50,200,-100]} angle={1} color="#024873"/>
            <spotLight position={[50,-100, 50]} angle={1} color="#345f65"/>
            <spotLight position={[-110,-200, 200]} angle={1} color="#024873"/>
            <Swarm count={1000} />
            <Dolly />
            </Canvas>
      </div>
  )
}

export default Home;