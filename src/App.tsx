import { useCallback, useEffect, useState } from "react";
import Input from "./components/input"
import Select from "./components/select";
import Text from "./components/text"
import Button from "./components/button";
import Icon from "./components/icon";
import PigIcon from './assets/piggy-bank.svg?react';
import LeafIcon from './assets/leaf.svg?react';
import WindRoseIcon from './assets/compass-rose.svg?react';
// import ArrowIcon from './assets/arrow-down.svg?react';
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
  const [ inputErrors, setInputErrors ] = useState<boolean[]>([false, false, false])

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

    //Check if can submit
    const arrayInputErrors = [
      consumptionNumber <= 0,
      cosipNumber <= 0,
      tariffNumber <= 0,
    ]
    setInputErrors(arrayInputErrors)
    if (arrayInputErrors.some((i) => i == true)){
      return
    }

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
  }, [wasCalculated, calculateSimulation])

  function cleanFields() {
    setAverageConsumption("")
    setCosip("")
    setFlag("")
    setTariff("")
    setWasCalculated(false)
  }

  return (
    <div className="relative flex flex-col justify-start overflow-x-hidden overflow-y-auto">
      <section className="relative flex min-h-180 w-full shrink-0 flex-col bg-linear-to-r from-blue-light from-30% to-blue-dark px-5 pb-14 pt-5 sm:min-h-170 sm:px-8 lg:h-125 lg:min-h-0 lg:px-20 lg:pb-0">
        <header className="flex justify-between items-center h-14">
          <Icon svg={logo} className="w-13 h-13"/>
          <div className="flex justify-center gap-14">
            {/* <Text as="a">sobre nós</Text> */}
            {/* <Text variant="body-base-semibold"><a href="#simulation">Faça uma simulação</a></Text> */}
            <Button
              variant="quinary"
              size="lg"
              textVariants="dark"
              className="hover:cursor-pointer"
              onClick={() => {
                window.location.href = "#simulation";
              }}
            >Faça uma simulação</Button>
          </div>
        </header>
        <div className="flex h-full flex-col items-start justify-center gap-8 pt-15 lg:flex-row lg:items-center lg:justify-between lg:pt-0">
          <div className="flex max-w-full flex-col gap-2.5 lg:max-w-140">
            <div>
              <Text as="h1" variant="body-32-bold" className="text-2xl sm:text-3xl lg:text-4xl">USINA SOLAR</Text>
              <Text as="h1" variant="body-6xl-bold" color="green" className="text-4xl sm:text-5xl lg:text-6xl">CAMPESTRE</Text>
            </div>
            <Text as="a">Até 30% de desconto na sua tarifa de energia de maneira sustentável!</Text>
            {/* <Button
              variant="quinary"
              size="lg"
              icon={ArrowIcon}
              className="hover:cursor-pointer mt-2.5"
              onClick={() => {
                window.location.href = "#simulation";
              }}
            >Faça uma simulação</Button> */}
          </div>
          <div className="w-full lg:w-auto">
              <img src={powerImage} className="flex aspect-4/3 h-auto w-full max-w-160 max-h-80 rounded-3xl object-cover lg:h-full lg:w-220" />
          </div>
        </div>
      </section>

      <div className={`relative z-10 mx-4 -mt-12 mb-8 grid w-auto grid-cols-1 gap-4 rounded-2xl bg-green px-5 py-6 sm:grid-cols-3 lg:absolute lg:left-1/2 lg:top-106 lg:mx-0 lg:mb-0 lg:mt-0 lg:flex lg:h-38 lg:w-175 lg:-translate-x-1/2 lg:items-center lg:justify-between lg:px-20 lg:py-2.5`}>
        <div className="flex min-h-24 flex-col items-center justify-center gap-2.5 sm:min-h-0 lg:h-full lg:max-w-33">
          <Icon svg={PigIcon} className="size-10 fill-white lg:size-12" />
          <Text variant="body-sm-semibold" className="text-center">Economize na conta de energia</Text>
        </div>
        <div className="flex min-h-24 flex-col items-center justify-center gap-2.5 sm:min-h-0 lg:h-full lg:max-w-33">
          <Icon svg={LeafIcon} className="size-10 fill-white lg:size-12" />
          <Text variant="body-sm-semibold" className="text-center">Energia limpa e renovável</Text>
        </div>
        <div className="flex min-h-24 flex-col items-center justify-center gap-2.5 sm:min-h-0 lg:h-full lg:max-w-33">
          <Icon svg={WindRoseIcon} className="size-10 fill-white lg:size-12" />
          <Text variant="body-sm-semibold" className="text-center">Disponível para todo o Piauí</Text>
        </div>
      </div>
      <div className="flex min-h-0 shrink-0 flex-col items-center justify-center gap-8 px-5 py-14 sm:px-8 lg:h-145 lg:flex-row lg:gap-50 lg:px-0 lg:py-0">
        <div className="flex w-full max-w-116 flex-col items-start justify-center gap-5 lg:h-full">
          <Text variant="body-4xl-semibold" color="blue" className="text-2xl lg:text-4xl">Sobre nós</Text>
          <Text variant="body-2xl-medium" color="gray" className="text-base sm:text-lg lg:text-2xl">
            Somos uma mini usina solar localizada em São João da Serra no Piauí. Fornecemos créditos de energia de maneira limpa e sustentável, ajudando você a economizar até 30% no valor da tarifa da sua conta de energia.
          </Text>
        </div>
        <video 
          className="aspect-video h-auto w-full max-w-141 rounded-2xl object-cover lg:h-94"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src={powerVideo} type="video/mp4" />
        </video>
      </div>
      <div id="simulation" className="flex min-h-0 flex-col items-center justify-center gap-6 px-5 py-10 sm:px-8 lg:min-h-85 lg:gap-0 lg:px-0 lg:py-2.5">
        <Text color="blue" variant="body-4xl-semibold" className="text-2xl lg:text-4xl">Faça uma simulação</Text>
        <div className="grid h-auto w-full grid-cols-1 justify-items-center items-center gap-4 pt-2 sm:grid-cols-2 lg:flex lg:h-55 lg:items-start lg:gap-10 lg:pt-14 lg:justify-center">
          <div className="flex w-full max-w-47 flex-col items-stretch justify-center gap-2.5 lg:items-center"> 
            <Text variant="body-base-semibold" color="blue" className="min-h-10 text-center content-center lg:h-10">Tipo de fornecimento</Text>
            <Select options={supplyOptions} currentOption={currentSupply} setCurrentOption={setCurrentSupply} />
          </div>
          <div className="flex w-full max-w-47 flex-col items-stretch justify-center gap-2.5 lg:items-center">
            <Text variant="body-base-semibold" color="blue" className="min-h-10 text-center content-center lg:h-10">Quantidade média de consumo (kWh)</Text>
            <Input 
              type="text" 
              inputMode="decimal" 
              value={averageConsumption} 
              onChange={(e) => handleInputValues(e, 0)} 
            />
            {inputErrors[0] && (
              <Text variant="body-xs-bold" color="error" className="min-h-10 text-center content-center lg:h-10">Quantidade de consumo deve ser maior que zero</Text>
            )}
          </div>
          <div className="flex w-full max-w-47 flex-col items-stretch justify-center gap-2.5 lg:items-center">
            <Text variant="body-base-semibold" color="blue" className="min-h-10 text-center content-center lg:h-10">Tarifa</Text>
            <Input type="text" inputMode="decimal" value={tariff} onChange={(e) => handleInputValues(e, 3)} />
            {inputErrors[2] && (
              <Text variant="body-xs-bold" color="error" className="min-h-10 text-center content-center lg:h-10">Tarifa deve ser maior que zero</Text>
            )}
          </div>
          <div className="flex w-full max-w-47 flex-col items-stretch justify-center gap-2.5 lg:items-center">
            <Text variant="body-base-semibold" color="blue" className="min-h-10 text-center content-center lg:h-10">Cip-Ilum Pub.</Text>
            <Input type="text" inputMode="decimal"  value={cosip} onChange={(e) => handleInputValues(e, 1)} />
            {inputErrors[1] && (
              <Text variant="body-xs-bold" color="error" className="min-h-10 text-center content-center lg:h-10">Taxa de iluminação deve ser maior que zero</Text>
            )}
          </div>
          <div className="flex w-full max-w-47 flex-col items-stretch justify-center gap-2.5 lg:items-center">
            <Text variant="body-base-semibold" color="blue" className="min-h-10 text-center content-center lg:h-10">Adicional bandeira</Text>
            <Input type="text" inputMode="decimal"  value={flag} onChange={(e) => handleInputValues(e, 2)} />
          </div>
        </div>
        {
          wasCalculated ? (
            <div className="flex min-h-0 w-full flex-col items-center gap-5 pb-5 lg:min-h-60">
              <div className="grid min-h-36 w-full max-w-3xl grid-cols-1 gap-3 rounded-2xl bg-gray-light p-4 shadow-[4px_4px_4px_0px_rgba(0,0,0,0.25)] sm:grid-cols-2 lg:flex lg:w-auto lg:max-w-none lg:gap-0 lg:p-0">
                <div className="flex w-full min-w-0 flex-col items-center justify-center gap-2.5 lg:max-w-35">
                  <Text variant="body-base-semibold" color="blue" className="min-h-15 h-auto px-2 text-center content-center lg:h-15">Valor sem benefício</Text>
                  <Button variant="tertiary" size="sm">{simulationValues[0].toFixed(2)}</Button>
                </div>
                <div className="flex w-full min-w-0 flex-col items-center justify-center gap-2.5 lg:max-w-35">
                  <Text variant="body-base-semibold" color="blue" className="min-h-15 h-auto px-2 text-center content-center lg:h-15">Valor com benefício</Text>
                  <Button variant="secondary" size="sm">{simulationValues[1].toFixed(2)}</Button>
                </div>
                <div className="flex w-full min-w-0 flex-col items-center justify-center gap-2.5 lg:max-w-35">
                  <Text variant="body-base-semibold" color="blue" className="min-h-15 h-auto px-2 text-center content-center lg:h-15">Economia mensal</Text>
                  <Button variant="secondary" size="sm">{simulationValues[2].toFixed(2)}</Button>
                </div>
                <div className="flex w-full min-w-0 flex-col items-center justify-center gap-2.5 lg:max-w-35">
                  <Text variant="body-base-semibold" color="blue" className="min-h-15 h-auto px-2 text-center content-center lg:h-15">Economia aproximada anual</Text>
                  <Button variant="quaternary" size="sm">{simulationValues[3].toFixed(2)}</Button>
                </div>
              </div>
              <Button
                onClick={cleanFields}
              >Recalcular</Button>
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

      <div className="relative isolate mt-8 flex w-full flex-col items-center gap-6 overflow-hidden rounded-t-2xl border-t-4 border-green bg-linear-to-br from-blue-light via-blue-light to-blue-dark px-5 py-10 shadow-[0_-12px_32px_rgba(0,0,0,0.12)] sm:mt-12 sm:gap-8 sm:px-8 sm:py-8 lg:mt-0 lg:rounded-t-[3rem] lg:px-8 lg:py-4">
        <Text variant="body-base-semibold" className="text-center text-2xl tracking-wide">Fale conosco</Text>
        <div className="grid w-full max-w-3xl grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
          <div className="flex min-h-28 flex-col items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-5 py-6 text-center shadow-[0_8px_24px_rgba(0,0,0,0.12)]">
            <Text variant="body-xl-semibold" color="green" className="text-lg tracking-wide sm:text-xl">Whatsapp</Text>
            <Text variant="body-base-medium" color="white" className="text-sm sm:text-base">(86) 99965-5800</Text>
          </div>
          <div className="flex min-h-28 flex-col items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-5 py-6 text-center shadow-[0_8px_24px_rgba(0,0,0,0.12)]">
            <Text variant="body-xl-semibold" color="green" className="text-lg tracking-wide sm:text-xl">E-mail</Text>
            <Text variant="body-base-medium" color="white" className="break-all text-sm sm:text-base">energiasolarsjs@gmail.com</Text>
          </div>
        </div>
      </div>
    </div>
  )

}

export default App
