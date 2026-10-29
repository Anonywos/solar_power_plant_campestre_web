import { useCallback, useEffect, useState } from "react";
import Input from "./components/input"
import Select from "./components/select";
import Text from "./components/text"
import Button from "./components/button";
import Icon from "./components/icon";
import PigIcon from './assets/piggy-bank.svg?react';
import LeafIcon from './assets/leaf.svg?react';
import WindRoseIcon from './assets/compass-rose.svg?react';
import logo from './assets/logo.svg?react'
import powerImage from './assets/images/foto_cut.jpg'
import powerVideo from './assets/video/video.mp4'

function App() {
  const supplyOptions = ['Monofásico', 'Trifásico']
  const [ currentSupply, setCurrentSupply ] = useState<string>(supplyOptions[0])
  const [ averageConsumption, setAverageConsumption] = useState<string>("")
  const [ cosip, setCosip] = useState<string>("")
  const [ flag, setFlag] = useState<string>("")
  const [ tariff, setTariff] = useState<string>("")
  const canSubmit = averageConsumption !== '' &&
    cosip !== '' &&
    flag !== '' &&
    tariff !== '' 
  const [ wasCalculated, setWasCalculated ] = useState(false)
  const [ simulationValues, setSimulationValues ] = useState<number[]>([])

  function handleInputValues(e:React.ChangeEvent<HTMLInputElement>, index:number) {
    const value = e.target.value

    if (/^\d*([.,]\d*)?$/.test(value)) {
      switch (index) {
        case 0:
          setAverageConsumption(value)
          break;
        case 1:
          setCosip(value)
          break;
        case 2:
          setFlag(value)
          break;
        case 3:
          setTariff(value)
          break;
      }
    }

    if (wasCalculated) calculateSimulation()
  }

  const calculateSimulation = useCallback(() => {
    const supplyNumber = currentSupply === 'Trifásico' ? 100 : 30
    const consumptionNumber = Number(averageConsumption.replace(',', '.'))
    const cosipNumber = Number(cosip.replace(',', '.'))
    const flagNumber = Number(flag.replace(',', '.'))
    const tariffNumber = Number(tariff.replace(',', '.'))
    const powerTariff = consumptionNumber > 500 ? 0.94669 : 0.951489
    const results:number[] = []

    // Without benefit
    const withoutBenefit = (consumptionNumber*tariffNumber)+flagNumber+cosipNumber
    results[0] = withoutBenefit

    //With benefit
    const withBenefit = supplyNumber*tariffNumber+flagNumber+cosipNumber+((consumptionNumber-supplyNumber)*powerTariff)
    results[1] = withBenefit

    //Economy
    const savedMoney = withoutBenefit-withBenefit
    results[2] = savedMoney
    results[3] = savedMoney*12

    setSimulationValues(results)
    setWasCalculated(true)
  }, [currentSupply, averageConsumption, cosip, flag, tariff])

  useEffect(() => {
    if (wasCalculated) {
      calculateSimulation()
    }
  }, [averageConsumption, cosip, flag, tariff, wasCalculated, calculateSimulation])

  return (
    <div className="relative flex flex-col h-screen justify-start overflow-y-auto">
      <section className="flex flex-col h-125 shrink-0 w-full bg-linear-to-r from-blue-light from-30% to-blue-dark px-20 pt-5">
        <header className="flex justify-center items-center h-14 content-between">
          <Icon svg={logo} className="w-13 h-13"/>
          <div className="flex flex-1 justify-center gap-14">
            {/* <Text as="a">sobre nós</Text> */}
            {/* <Text as="a">faça uma simulação</Text> */}
          </div>
        </header>
        <div className="flex h-full items-center justify-between">
          <div className="flex flex-col gap-2.5 max-w-140">
            <div>
              <Text as="h1" variant="body-32-bold">USINA SOLAR</Text>
              <Text as="h1" variant="body-6xl-bold" color="green">CAMPESTRE</Text>
            </div>
            <Text as="a">Até 30% de desconto na sua tarifa de energia de maneira sustentável!</Text>
          </div>
          <div>
              <img src={powerImage} className="flex w-220 h-full rounded-3xl" />
          </div>
        </div>
      </section>
      <div className={`absolute inset-0 top-106 left-1/2 -translate-x-1/2 z-50 w-175 h-38 
        flex items-center justify-between px-20 py-2.5 bg-green rounded-2xl
      `}>
        <div className="flex flex-col h-full max-w-33 justify-center items-center gap-2.5">
          <Icon svg={PigIcon} className="fill-white size-12" />
          <Text variant="body-xs-bold" className="text-center">Economize na conta de energia</Text>
        </div>
        <div className="flex flex-col h-full max-w-33 justify-center items-center  gap-2.5">
          <Icon svg={LeafIcon} className="fill-white size-12" />
          <Text variant="body-xs-bold" className="text-center">Energia limpa e renovável</Text>
        </div>
        <div className="flex flex-col h-full max-w-33 justify-center items-center  gap-2.5">
          <Icon svg={WindRoseIcon} className="fill-white size-12" />
          <Text variant="body-xs-bold" className="text-center">Disponível para todo o Piauí</Text>
        </div>
      </div>
      <div className="flex justify-center items-center h-145 shrink-0 gap-50">
        <div className="flex flex-col h-full items-start gap-5 max-w-116 justify-center">
          <Text variant="body-4xl-semibold" color="blue">Sobre nós</Text>
          <Text variant="body-2xl-medium" color="gray">
            Somos uma mini usina solar localizada em São João da Serra no Piauí. Fornecemos créditos de energia de maneira limpa e sustentável, ajudando você a economizar até 30% no valor da tarifa da sua conta de energia.
          </Text>
        </div>
        <video 
          className="w-141 h-94 object-cover rounded-2xl"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src={powerVideo} type="video/mp4" />
        </video>
      </div>
      <div className="flex flex-col items-center justify-center min-h-85 py-2.5">
        <Text color="blue" variant="body-4xl-semibold">Faça uma simulação</Text>
        <div className="flex w-full h-55 justify-center items-center gap-10">
          <div className="flex flex-col max-w-47 items-center justify-center gap-2.5">
            <Text variant="body-base-semibold" color="blue" className="h-10 text-center content-center">Tipo de fornecimento</Text>
            <Select options={supplyOptions} currentOption={currentSupply} setCurrentOption={setCurrentSupply} />
          </div>
          <div className="flex flex-col max-w-47 items-center justify-center gap-2.5">
            <Text variant="body-base-semibold" color="blue" className="h-10 text-center content-center">Quantidade média de consumo (kWh)</Text>
            <Input type="text" inputMode="decimal" value={averageConsumption} onChange={(e) => handleInputValues(e, 0)} />
          </div>
          <div className="flex flex-col max-w-47 items-center justify-center gap-2.5">
            <Text variant="body-base-semibold" color="blue" className="h-10 text-center content-center">Tarifa</Text>
            <Input type="text" inputMode="decimal" value={tariff} onChange={(e) => handleInputValues(e, 3)} />
          </div>
          <div className="flex flex-col max-w-47 items-center justify-center gap-2.5">
            <Text variant="body-base-semibold" color="blue" className="h-10 text-center content-center">Taxa de iluminação pública</Text>
            <Input type="text" inputMode="decimal"  value={cosip} onChange={(e) => handleInputValues(e, 1)} />
          </div>
          <div className="flex flex-col max-w-47 items-center justify-center gap-2.5">
            <Text variant="body-base-semibold" color="blue" className="h-10 text-center content-center">Adicional bandeira</Text>
            <Input type="text" inputMode="decimal"  value={flag} onChange={(e) => handleInputValues(e, 2)} />
          </div>
        </div>
        {
          wasCalculated ? (
            <div className="flex bg-gray-light min-h-36 shadow-[4px_4px_4px_0px_rgba(0,0,0,0.25)] rounded-2xl">
              <div className="flex flex-col max-w-35 items-center justify-center gap-2.5">
                <Text variant="body-base-semibold" color="blue" className="h-15 text-center content-center">Valor sem benefício</Text>
                <Button variant="tertiary" size="sm">{simulationValues[0].toFixed(2)}</Button>
              </div>
              <div className="flex flex-col max-w-35 items-center justify-center gap-2.5">
                <Text variant="body-base-semibold" color="blue" className="h-15 text-center content-center">Valor com benefício</Text>
                <Button variant="secondary" size="sm">{simulationValues[1].toFixed(2)}</Button>
              </div>
              <div className="flex flex-col max-w-35 items-center justify-center gap-2.5">
                <Text variant="body-base-semibold" color="blue" className="h-15 text-center content-center">Economia mensal</Text>
                <Button variant="secondary" size="sm">{simulationValues[2].toFixed(2)}</Button>
              </div>
              <div className="flex flex-col max-w-35 items-center justify-center gap-2.5">
                <Text variant="body-base-semibold" color="blue" className="h-15 text-center content-center">Economia aproximada anual</Text>
                <Button variant="quaternary" size="sm">{simulationValues[3].toFixed(2)}</Button>
              </div>
            </div>
          ) : (
            <Button 
              onClick={calculateSimulation} 
              disabled={!canSubmit} 
              variant={canSubmit === true ? 'primary' : 'disabled'}
            >Calcular</Button>
          )
        }
      </div>
      <div className="flex flex-col items-center w-full py-2.5 gap-4 bg-linear-to-r from-blue-light from-30% to-blue-dark">
        <Text variant="body-xl-semibold">Fale conosco</Text>
        <div className="flex items-center justify-center w-full gap-25">
          <div className="flex flex-col gap-1.5">
            <Text variant="body-xl-semibold" color="green">Whatsapp</Text>
            <Text variant="body-base-medium" color="white">(86) 99965-5800</Text>
          </div>
          <div className="flex flex-col gap-1.5">
            <Text variant="body-xl-semibold" color="green">E-mail</Text>
            <Text variant="body-base-medium" color="white">energiasolarsjs@gmail.com</Text>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
