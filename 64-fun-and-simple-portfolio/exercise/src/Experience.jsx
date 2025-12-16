import { Text, Html, PresentationControls, Environment, useGLTF, Float, ContactShadows } from '@react-three/drei'

export default function Experience()
    // color args={ ['#241a1a']} attach="background makes the backgound darkred.
{

    const computer = useGLTF('https://threejs-journey.com/resources/models/macbook_model.gltf')

    return <>

        <Environment preset='city'/>

        {/* <color args={ ['#241a1a']} attach="background"/> */}
        {/* <OrbitControls makeDefault /> */}
        
        {/* <mesh>
            <boxGeometry />
            <meshNormalMaterial />
        </mesh> */}
        {/* Controls Move/Drag controls */}
        <PresentationControls 
            global
            rotation={ [ 0.13, 0.1, 0] } // limites the default rotation
            polar={ [ - 0.4, 0.2 ]} // limits the vertical rotation between -0.4 to 0.2 (vertical is named 'polar')
            azimuth={ [ - 1, 0.75] } // limits the horizontal rotation between -1 to 0.75 (horizontal is named 'azimuth')
            damping={ 0.1} // higher damping makes the animation feel slow, while lower damping makes the animation feel fast.
            snap // snaps the computer back to its original position
        
        > {/* PresentationControls is like a limited OrbitControl, you can only grab and move the computer a certain amount */}
            <Float rotationIntensity={ 0.4 }> {/* Float is a drei that makes the primitive float around */}¨
                {/* Laptop Light */}
                <rectAreaLight
                    width={ 2.5 }
                    height={ 1.65 }
                    intensity={ 65 }
                    color={ '#ffffffff'}
                    rotation={ [ - 0.1, Math.PI, 0]}
                    position={ [0, 0.55, - 1.15] }
                    />
                
                    {/* Laptop / Object*/}
                <primitive
                    object={ computer.scene}
                    position-y={ - 1.2 }
                >
                {/* Html Page (your screen page) */}
                <Html
                    transform
                    wrapperClass='htmlScreen'
                    distanceFactor={ 1.17}
                    position={ [0, 1.56, -1.4] }
                    rotation-x={ - 0.256}
                >
                    <iframe src='https://sometypeofcode.dev/'/>
                </Html>
                </primitive>
                {/* 3D text */}
                <Text
                    font='./bangers-v20-latin-regular.woff'
                    fontSize={ .75 }
                    position={ [2, 0.75, 0.75]}
                    rotation-y={ - 1.25}
                    // children={"Victor's\rGraduation project"} {/* Creates linebreaks to the text */}
                    maxWidth={ 2 } // creates an automatic linebreak with two lines
                    textAlign='center' // centers the text 
                >Victor Furustubbe</Text>
            </Float>
        </PresentationControls>
            {/*Shadow below the computer */}
        <ContactShadows 
            position-y={ - 1.4}
            opacity={ 0.4 }
            scale={ 5 }
            blur={ 2.4 }
        /> 

    </>
}