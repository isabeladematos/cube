import { ReactElement, useEffect, useRef, useState } from "react"

import { TbFileUpload, TbFile, TbX } from "react-icons/tb"
import styled from "styled-components"

import Button from "./button"

interface ContainerProps {
  isOpen: boolean
}

interface Props extends ContainerProps {
  onClose: () => void
}

interface UploadProps {
  isDragging: boolean
}

const Container = styled.div<ContainerProps>`
  display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
  position: fixed;
  justify-content: center;
  align-items: center;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: var(--shadow);
`

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  min-height: 400px;
  min-width: 500px;
  background: var(--white);
  border-radius: 15px;
`

const FormContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding: 30px;
  gap: 10px;
  flex-grow: 1;
`

const UploadBox = styled.div<UploadProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 3px dashed var(--dark-blue);
  border-radius: 15px;
  gap: 10px;
  padding: 30px;
  margin: 20px 0 0 0;
  cursor: pointer;
  position: relative;

  background-color: ${({ isDragging }) =>
    isDragging ? "var(--gray-200)" : "var(--white)"};

  &:hover {
    background-color: var(--light-purple);
  }
`

const Input = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0;
  cursor: pointer;

  &:valid {
    background-color: var(--gray-200);
  }
`

const UploadFileIcon = styled(TbFileUpload)`
  color: var(--dark-blue);
`

const FormFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  border-top: 1px solid var(--gray-200);
  width: 100%;
  padding: 20px 0;
`

const StyledSpan = styled.span`
  font-size: 12px;
`

const FileBox = styled.div`
  display: flex;
  flex-direction: row;
  border: 1px solid var(--gray-300);
  border-radius: 10px;
  margin: 20px 0 0 0;
  padding: 10px;
  gap: 10px;
`

const FileIconBox = styled.div`
  border: 1px solid var(--gray-200);
  border-radius: 5px;
  padding: 5px;
`

const FileDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  flex-grow: 1;
`

const StyledFileIcon = styled(TbFile)`
  color: var(--dark-blue);
`

const StyledXIcon = styled(TbX)`
  color: var(--dark-blue);
  cursor: pointer;
`

const StyledButton = styled(Button)`
  width: 40%;
`

function UploadModal({ isOpen, onClose }: Props): ReactElement {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const dropZone = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const changeHandler = (files?: FileList | null): void => {
    if (files) {
      setSelectedFile(files[0])
    } else {
      setSelectedFile(null)
      if (inputRef.current) inputRef.current.value = ""
    }
  }

  useEffect(() => {
    if (!dropZone?.current) return

    dropZone.current.addEventListener(
      "dragover",
      () => setIsDragging(true),
      false
    )
    dropZone.current.addEventListener(
      "dragleave",
      () => setIsDragging(false),
      false
    )
    dropZone.current.addEventListener("drop", () => setIsDragging(false), false)
  }, [])

  const handleSubmission = () => {}

  return (
    <Container isOpen={isOpen} onClick={onClose}>
      <Card onClick={(e) => e.stopPropagation()}>
        <FormContent>
          <h3>Upload File</h3>
          <span>Upload a file from your computer.</span>
          <UploadBox ref={dropZone} isDragging={isDragging}>
            <Input
              type="file"
              accept=".txt"
              ref={inputRef}
              onChange={(e) => changeHandler(e.target.files)}
            />
            <UploadFileIcon size={60} />
            <h5>Click to upload or drag and drop file here.</h5>
            <StyledSpan>Maximum file size 10MB.</StyledSpan>
          </UploadBox>
          {selectedFile && (
            <FileBox>
              <FileIconBox>
                <StyledFileIcon size={20} />
              </FileIconBox>
              <FileDetails>
                <h6>{selectedFile.name}</h6>
                <StyledSpan>
                  {(selectedFile.size / 1000).toFixed(2)} KB
                </StyledSpan>
              </FileDetails>
              <StyledXIcon size={15} onClick={() => changeHandler()} />
            </FileBox>
          )}
        </FormContent>
        <FormFooter>
          <StyledButton secondary onClick={onClose}>
            Cancel
          </StyledButton>
          <StyledButton disabled={!selectedFile} onClick={handleSubmission}>
            Upload file
          </StyledButton>
        </FormFooter>
      </Card>
    </Container>
  )
}

export default UploadModal